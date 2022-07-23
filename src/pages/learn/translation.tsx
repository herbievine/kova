import type { NextPage } from 'next'
import type React from 'react'
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState
} from 'react'
import Spinner from '../../components/Spinner'
import useKey from '../../hooks/useKey'
import Page from '../../layouts/Page'
import { InferQueryOutput, TWordType } from '../../types/trpc'
import { trpc } from '../../utils/trpc'

interface TranslationProps {}

const Translation: NextPage<TranslationProps> = () => {
  const [lessonStatus, setLessonStatus] = useState<
    'menu' | 'course' | 'finished'
  >('menu')
  const [translationOptions, setTranslationOptions] = useState<{
    limit: number
    wordType: TWordType | null
  }>({
    limit: 10,
    wordType: null
  })
  const [attempt, setAttempt] = useState('')
  const [attemptStatus, setAttemptStatus] = useState<
    'correct' | 'wrong' | null
  >(null)
  const { data, refetch, isLoading } = trpc.useQuery(
    ['translations.get', translationOptions],
    { enabled: false }
  )
  const [wrongAnswers, setWrongAnswers] = useState<
    InferQueryOutput<'translations.get'>
  >([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(
    [...(data ?? []), ...wrongAnswers][currentWordIndex]
  )
  const [score, setScore] = useState<[number, number]>([0, 0])

  const keyListener = useKey('Enter', () => {
    if (lessonStatus === 'course') {
      if (attemptStatus === null) {
        setAttemptStatus(attempt === currentWord?.answer ? 'correct' : 'wrong')

        if (currentWord && attemptStatus === 'wrong') {
          setWrongAnswers((prev) => [...prev, currentWord])
        }
      } else {
        setCurrentWordIndex((index) => index + 1)
        setAttemptStatus(null)
        setAttempt('')
      }
    }
  })

  useEffect(() => {
    setCurrentWord([...(data ?? []), ...wrongAnswers][currentWordIndex])
  }, [data, currentWordIndex, wrongAnswers])

  useEffect(() => {
    console.log(currentWordIndex, [...(data ?? []), ...wrongAnswers].length)

    if (
      lessonStatus === 'course' &&
      !isLoading &&
      currentWordIndex === [...(data ?? []), ...wrongAnswers].length
    ) {
      setLessonStatus('finished')
      setScore([
        [...(data ?? [])].length - wrongAnswers.length,
        [...(data ?? [])].length
      ])
    }
  }, [currentWordIndex, lessonStatus, data, isLoading, wrongAnswers])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setAttempt(value.replace(/[^0-9À-ÿ\w\s]/g, ''))
  }

  useEffect(() => {
    console.log(data, currentWord)
  }, [currentWord, data])

  if (lessonStatus === 'menu') {
    return (
      <Page title="Translations">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="p-12 flex flex-col items-center border rounded border-neutral-700">
            <h2 className="mb-12 text-3xl">Translations</h2>
            <div className="w-full mb-6 flex flex-col items-center">
              <h3>How many words do you want to learn today?</h3>
              <div className="w-full mt-2 flex justify-around items-center">
                {[3, 10, 25, 50, 80].map((limit) => (
                  <button
                    key={limit}
                    onClick={() =>
                      setTranslationOptions((opts) => ({ ...opts, limit }))
                    }
                    className={`py-2 px-6 flex text-sm border rounded cursor-pointer ${
                      translationOptions.limit === limit
                        ? 'bg-neutral-200 text-neutral-900'
                        : 'border-neutral-700'
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
                {['VERB', 'ADJECTIVE', 'NOUN'].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      translationOptions.wordType === type
                        ? setTranslationOptions((opts) => ({
                            ...opts,
                            wordType: null
                          }))
                        : setTranslationOptions((opts) => ({
                            ...opts,
                            wordType: type as TWordType
                          }))
                    }
                    className={`py-2 px-6 flex text-sm border rounded cursor-pointer ${
                      translationOptions.wordType === type
                        ? 'bg-neutral-200 text-neutral-900'
                        : 'border-neutral-700'
                    }`}
                  >
                    {type.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                refetch()
                setLessonStatus('course')
              }}
            >
              Start
            </button>
          </div>
        </div>
      </Page>
    )
  }

  if (lessonStatus === 'course') {
    return (
      <Page title="Translations">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="p-12 flex flex-col items-center border rounded border-neutral-700">
            <div className="flex flex-col items-center">
              <h3 className="text-lg">{currentWord?.prompt}</h3>
              <input
                className={`w-full mt-2 py-2 px-6 text-sm border bg-neutral-900 rounded ${
                  attemptStatus === null
                    ? 'border-neutral-700'
                    : attemptStatus === 'correct'
                    ? 'border-green-500'
                    : 'border-red-500'
                }`}
                type="text"
                value={attempt}
                onChange={onChange}
                // onKeyUp={(event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => null}
                {...keyListener}
              />
              {attemptStatus === null && (
                <button
                  onClick={() => {
                    setAttemptStatus(
                      attempt === currentWord?.answer ? 'correct' : 'wrong'
                    )

                    if (currentWord && attemptStatus === 'wrong') {
                      setWrongAnswers((prev) => [...prev, currentWord])
                    }
                  }}
                  className="mt-6"
                >
                  Check
                </button>
              )}
              {attemptStatus !== null && (
                <button
                  onClick={() => {
                    setCurrentWordIndex((index) => index + 1)
                    setAttemptStatus(null)
                    setAttempt('')
                  }}
                  className="mt-6"
                >
                  Next
                </button>
              )}
              {attemptStatus === 'wrong' && (
                <p className="mt-6 text-sm">
                  Correct answer is {currentWord?.answer}
                </p>
              )}
            </div>
          </div>
        </div>
      </Page>
    )
  }

  return (
    <Page title="Translations">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="p-12 flex flex-col items-center border rounded border-neutral-700">
          <h2 className="mb-12 text-3xl">Congratulations</h2>
          <h3>
            You scored {score[0]}/{score[1]}
          </h3>
        </div>
      </div>
    </Page>
  )
}

export default Translation
