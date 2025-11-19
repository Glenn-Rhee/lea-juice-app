import { getToken } from "next-auth/jwt";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import z from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  imageUpload: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .input(
      z.object({
        image: z.url({ error: "Please fill your image url" }),
      })
    )
    .middleware(async ({ req, input }) => {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        throw new UploadThingError("User not authenticated!");
      }

      const fileKey = input.image.split("/").pop();

      const utApi = new UTApi();
      await utApi.deleteFiles(fileKey!);
      return { id: token.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const url = file.ufsUrl;
      return {
        id: metadata.id,
        url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
