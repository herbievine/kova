// src/server/router/index.ts
import * as trpc from "@trpc/server";
import { createRouter } from "./context";
import superjson from "superjson";

import { folderRouter } from "./functions/folder";
import { rootRouter } from "./functions/root";

export const appRouter = createRouter()
  .transformer(superjson)
  .middleware(({ ctx, next }) => {
    if (!ctx?.session?.user?.id) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
      ctx: {
        ...ctx,
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  })
  .merge("root.", rootRouter())
  .merge("folder.", folderRouter());

export type AppRouter = typeof appRouter;
