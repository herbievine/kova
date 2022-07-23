import { createRouter } from './context'
import { z } from 'zod'
import { progressModel } from '../schema/api'

const progressWords = {
  output: z.array(progressModel)
}

export const progressRouter = createRouter().query('words', {
  ...progressWords,
  async resolve({ ctx }) {
    const progress = await z.array(progressModel).parseAsync(
      await ctx.prisma.progress.findMany({
        where: {
          userId: {
            equals: ctx.session?.user.id
          }
        }
      })
    )

    return await progressWords.output.parseAsync(progress)
  }
})
