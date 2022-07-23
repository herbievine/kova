import { createRouter } from './context'
import { z } from 'zod'
import { wordTypes } from '../../utils/schema'

export const testRouter = createRouter().mutation('save', {
  input: z.array(
    z.object({
      word: z.string(),
      translation: z.string(),
      type: wordTypes
    })
  ),
  async resolve({ input, ctx }) {
    console.log(input)

    return await ctx.prisma.word.createMany({
      data: input
    })
  }
})
