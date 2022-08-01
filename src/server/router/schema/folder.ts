import * as z from "zod";

export const folderSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  favorite: z.boolean(),
  color: z.enum([
    "RED",
    "ORANGE",
    "YELLOW",
    "GREEN",
    "BLUE",
    "PURPLE",
    "PINK",
    "BROWN",
    "GRAY",
  ]),
  userId: z.string().cuid(),
  rootFolderId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
