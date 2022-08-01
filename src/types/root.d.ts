import { Prisma } from "@prisma/client";

export type IRootFolder = Prisma.RootFolderGetPayload<{
  include: { folders: true };
}>;
