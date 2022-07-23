import type { NextPage } from 'next'
import type React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { z } from 'zod'
import Spinner from '../../components/Spinner'
import Page from '../../layouts/Page'
import { WordTypes } from '../../types/globals'
import type { InferQueryOutput, TWordType } from '../../types/trpc'
import { trpc } from '../../utils/trpc'

interface FlashcardsProps {}

const Flashcards: NextPage<FlashcardsProps> = () => {
  const [wordLimit, setWordLimit] = useState(10)
  const [wordType, setWordType] = useState<TWordType | null>()
  const [hasFinished, setHasFinished] = useState(false)
  const [score, setScore] = useState<[number, number]>([0, 0])
  const [hasStarted, setHasStarted] = useState(false)
  const { data, refetch, isLoading } = trpc.useQuery(
    ['translations.get', { limit: wordLimit, wordType }],
    { enabled: false }
  )
  const { data: d } = trpc.useQuery(['progress.words'])
  const [answer, setAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [wrongAnswers, setWrongAnswers] = useState<
    InferQueryOutput<'translations.get'>
  >([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(
    [...(data ?? []), ...wrongAnswers][currentWordIndex]
  )

  useEffect(() => {
    setCurrentWord([...(data ?? []), ...wrongAnswers][currentWordIndex])
  }, [data, currentWordIndex, wrongAnswers])

  useEffect(() => {
    if (!data && hasStarted) {
      refetch()
    }
  }, [data, hasStarted, refetch])

  useEffect(() => {
    if (
      hasStarted &&
      !isLoading &&
      currentWordIndex === [...(data ?? []), ...wrongAnswers].length
    ) {
      setHasFinished(true)
      setScore([
        [...(data ?? [])].length - wrongAnswers.length,
        [...(data ?? [])].length
      ])
    }
  }, [currentWordIndex, data, hasFinished, hasStarted, isLoading, wrongAnswers])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setAnswer(value.replace(/[^0-9À-ÿ\w\s]/g, ''))
  }

  useEffect(() => console.log(currentWordIndex), [currentWordIndex])

  return (
    <Page title="Flashcards">
      <p>
        {currentWordIndex + 1} / {[...(data ?? []), ...wrongAnswers].length + 1}
      </p>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div
          className={`p-12 flex flex-col items-center border rounded ${
            isCorrect === null
              ? 'border-neutral-700'
              : isCorrect
              ? 'border-green-700'
              : 'border-red-700'
          }`}
        >
          {!hasStarted ? (
            <>
              <h2 className="mb-12 text-3xl">Flashcards</h2>
              <div className="w-full mb-6 flex flex-col items-center">
                <h3>How many words do you want to learn today?</h3>
                <div className="w-full mt-2 flex justify-around items-center">
                  {[10, 25, 50, 80].map((limit) => (
                    <button
                      key={limit}
                      onClick={() => setWordLimit(limit)}
                      className={`py-2 px-6 flex text-sm border border-neutral-700 rounded cursor-pointer ${
                        wordLimit === limit
                          ? 'bg-neutral-200 text-neutral-900'
                          : ''
                      }`}
                    >
                      {limit}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full mb-6 flex flex-col items-center">
                <h3>What type of word do you want to learn? (optional)</h3>
                <div className="w-full mt-2 flex justify-around items-center">
                  {['verb', 'adjective', 'noun'].map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        wordType === type
                          ? setWordType(null)
                          : setWordType(type as TWordType)
                      }
                      className={`py-2 px-6 flex text-sm border border-neutral-700 rounded cursor-pointer ${
                        wordType === type
                          ? 'bg-neutral-200 text-neutral-900'
                          : ''
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setHasStarted(true)}>Start</button>
            </>
          ) : !isLoading ? (
            <div className="flex flex-col items-end">
              <h3 className="text-lg">{currentWord?.prompt}</h3>
              <input
                className="w-full mt-2 py-2 px-6 text-sm border border-neutral-700 bg-neutral-900 rounded"
                type="text"
                value={answer}
                onChange={onChange}
              />
              {isCorrect !== null && !isCorrect && (
                <p>Correct answer is {currentWord?.answer}</p>
              )}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
        {isCorrect === null && hasStarted && (
          <button
            onClick={() => {
              if (answer === currentWord?.answer) {
                setIsCorrect(true)
              } else {
                setIsCorrect(false)

                if (currentWord) {
                  setWrongAnswers((prev) => [...prev, currentWord])
                }
              }
            }}
            className="mt-6"
          >
            Check
          </button>
        )}
        {isCorrect !== null && (
          <button
            onClick={() => {
              setCurrentWordIndex((index) => index + 1)
              setIsCorrect(null)
              setAnswer('')
            }}
            className="mt-6"
          >
            Next
          </button>
        )}
        {d && <p>{JSON.stringify(d)}</p>}
      </div>
    </Page>
  )
}

export default Flashcards
