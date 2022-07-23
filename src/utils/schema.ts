import { z } from 'zod'

export const wordTypes = z.enum(['VERB', 'ADJECTIVE', 'NOUN'])

export const progressLevels = z.enum([
  'NOVICE',
  'INTERMEDIATE',
  'ADVANCED',
  'SUPERIOR',
  'DISTINGUISHED'
])

export const wordModel = z.object({
  id: z.string(),
  word: z.string(),
  translation: z.string(),
  type: wordTypes
})

export const progressModel = z.object({
  id: z.string(),
  userId: z.string(),
  wordId: z.string(),
  level: progressLevels
})
