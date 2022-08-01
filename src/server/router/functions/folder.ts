import * as trpc from "@trpc/server";
import * as z from "zod";
import { createRouter } from "../context";

export const folderRouter = () =>
  createRouter()
    .query("findOne", {
      input: z.object({
        id: z.string().cuid(),
        rootFolderId: z.string().cuid(),
      }),
      resolve({ input, ctx: { prisma, session } }) {
        return prisma.folder.findUnique({
          where: {
            FolderUniqueIdentifier: {
              id: input.id,
              userId: session!.user!.id!,
              rootFolderId: input.rootFolderId,
            },
          },
          include: {
            folders: true,
            files: true,
          },
        });
      },
    })
    .mutation("create", {
      input: z.object({
        name: z.string(),
        rootFolderId: z.string().cuid(),
        parentFolderId: z.string().cuid().nullish(),
      }),
      resolve({ input, ctx: { prisma, session } }) {
        return prisma.folder.create({
          data: {
            name: input.name,
            userId: session!.user!.id!,
            rootFolderId: input.rootFolderId,
            parentFolderId: input.parentFolderId,
          },
          include: {
            folders: true,
            files: true,
          },
        });
      },
    });
