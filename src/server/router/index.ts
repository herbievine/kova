// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { translationsRouter } from './translations'
import { progressRouter } from './progress'
import { TRPCError } from '@trpc/server'
import { testRouter } from './test'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('test.', testRouter)
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next()
  })
  .merge('translations.', translationsRouter)
  .merge('progress.', progressRouter)

// export type definition of API
export type AppRouter = typeof appRouter
