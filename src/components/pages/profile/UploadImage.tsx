"use client";
import Loader from "@/components/icons/Loader";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import ResponseError from "@/error/ResponseError";
import { useUploadThing } from "@/lib/uploadthing";
import { ResponsePayload } from "@/types";
import { IconClick, IconPhotoScan } from "@tabler/icons-react";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";

export default function UploadImage() {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing("imageUpload", {
    onClientUploadComplete: ([data]) => {
      uploadImageToServer(data.ufsUrl);
    },
    onUploadProgress: (e) => setUploadProgress(e),
  });

  const onDropAccepted = async (accFiles: File[]) => {
    if (accFiles.length > 1) {
      toast.error("Oops! Maximum upload file only 1");
      return;
    }
    await startUpload(accFiles);
    setIsDragOver(false);
  };

  const onDropRejected = (rejectFiles: FileRejection[]) => {
    const [file] = rejectFiles;
    if (file.errors.some((err) => err.code.includes("type"))) {
      toast.error("Please choose a PNG, JPG, or JPEG image instead.");
    } else if (file.errors.some((err) => err.code.includes("large"))) {
      toast.error("Please choose a file less then 1MB");
    } else {
      toast.error("Something went wrong! Please try again later");
    }
    setIsDragOver(false);
  };

  async function uploadImageToServer(url: string) {
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          image: url,
        }),
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.code, dataResponse.message);
      }

      toast.success(dataResponse.message);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured!");
      }
    } finally {
      setFiles([]);
      setUploadProgress(undefined);
      setIsDragOver(false);
    }
  }

  return (
    <div className="w-full p-2 col-span-2">
      <h6 className="font-medium text-sm text-gray-800">Profile Picture</h6>
      <Dropzone
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpeg"],
          "image/jpg": [".jpg"],
        }}
        onDropAccepted={async (files) => {
          await onDropAccepted(files);
        }}
        onDropRejected={onDropRejected}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        maxSize={1024 * 1024}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="w-full rounded-lg flex flex-col justify-center items-center border-dotted border border-gray-500 h-32"
          >
            <Input {...getInputProps()} />
            {files.length === 0 && !isUploading && !isDragOver && (
              <IconPhotoScan className="text-zinc-500 mb-2 text-lg" />
            )}

            {isDragOver && <IconClick className="h-6 w-6 text-zinc-500 mb-2" />}

            {isUploading && <Loader />}

            <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <p>Uploading...</p>
                  <Progress
                    value={uploadProgress}
                    className="mt-2 w-40 bg-gray-300"
                  />
                </div>
              ) : isDragOver ? (
                <p>
                  <span className="font-semibold">Drop File</span> to Upload
                </p>
              ) : files.length > 0 ? (
                <p>{files[0].name}</p>
              ) : (
                <p>
                  <span className="font-semibold">Click to upload </span>
                  or Drag and Drop
                </p>
              )}
            </div>
            <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
