import * as trpc from "@trpc/server";
import * as z from "zod";
import { createRouter } from "../context";
import { folderSchema } from "../schema/folder";
import { rootFolderSchema } from "../schema/root";

const output = rootFolderSchema.merge(
  z.object({
    favorites: z.array(
      folderSchema.merge(z.object({ favorite: z.literal(true) }))
    ),
    recent: z.array(
      folderSchema.merge(z.object({ favorite: z.literal(false) }))
    ),
  })
);

export const rootRouter = () =>
  createRouter().query("get", {
    output,
    async resolve({ ctx: { prisma, session } }) {
      const { folders, ...restOfRootFolder } = await prisma.rootFolder.upsert({
        where: {
          userId: session!.user!.id!,
        },
        update: {},
        create: {
          userId: session!.user!.id!,
        },
        include: {
          folders: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      return output.parse({
        ...restOfRootFolder,
        favorites: folders.filter((folder) => folder.favorite),
        recent: folders.filter((folder) => !folder.favorite),
      });
    },
  });
