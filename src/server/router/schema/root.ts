import * as z from "zod";

export const rootFolderSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
