import { createRouter } from './context'
import { z } from 'zod'
import { shuffle } from '../../utils/shuffle'
import { wordModel, wordTypes } from '../schema/api'

const translationsGet = {
  input: z.object({
    limit: z.number().default(10),
    avoid: z.array(z.string()).nullish(),
    wordType: wordTypes.nullish()
  }),
  output: z.array(
    z.object({
      id: z.string(),
      prompt: z.string(),
      answer: z.string()
    })
  )
}

export const translationsRouter = createRouter().query('get', {
  ...translationsGet,
  async resolve({ input, ctx }) {
    const { limit, avoid, wordType } = input

    const words = await z.array(wordModel).parseAsync(
      await ctx.prisma.word.findMany({
        take: limit,
        where: {
          ...(wordType && {
            type: wordType
          }),
          ...(avoid && {
            id: {
              notIn: avoid
            }
          })
        }
      })
    )

    return await translationsGet.output.parseAsync(
      // shuffle(
      words.map((word) =>
        Math.random() > 0.5
          ? {
              id: word.id,
              prompt: `Translate the ${word.type.toLowerCase()} '${
                word.word
              }' in English`,
              answer: word.translation
            }
          : {
              id: word.id,
              prompt: `Translate the ${word.type.toLowerCase()} '${
                word.translation
              }' in Italian`,
              answer: word.word
            }
      )
      // )
    )
  }
})
