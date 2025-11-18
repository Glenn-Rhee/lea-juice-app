import { getToken } from "next-auth/jwt";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUpload: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        throw new Error("User not authenticated!");
      }

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
