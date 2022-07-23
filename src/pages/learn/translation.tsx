import type { NextPage } from 'next'
import type React from 'react'
import { useState } from 'react'
import { InferQueryOutput, TWordType } from '../../types/trpc'
import { trpc } from '../../utils/trpc'

interface TranslationProps {}

const Translation: NextPage<TranslationProps> = () => {
  const [translationOptions, setTranslationOptions] = useState<{
    limit: number
    wordType: TWordType | null
  }>({
    limit: 10,
    wordType: null
  })
  const { data, refetch, isLoading } = trpc.useQuery(
    ['translations.get', translationOptions],
    { enabled: false }
  )
  const [attempt, setAttempt] = useState('')
  const [wrongAnswers, setWrongAnswers] = useState<
    InferQueryOutput<'translations.get'>
  >([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(
    [...(data ?? []), ...wrongAnswers][currentWordIndex]
  )

  return <div className=""></div>
}

export default Translation
