"use client";
import Loader from "@/components/icons/Loader";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { IconClick, IconPhotoScan } from "@tabler/icons-react";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import toast from "react-hot-toast";

interface UploadImageProps {
  label: string;
  files: File[];
  isUploading: boolean;
  uploadProgress: number | undefined;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function UploadImage(props: UploadImageProps) {
  const { label, files, setFiles, isUploading, uploadProgress } = props;
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const onDropAccepted = async (accFiles: File[]) => {
    if (accFiles.length > 1) {
      toast.error("Oops! Maximum upload file only 1");
      return;
    }
    setFiles(accFiles);
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
  
  return (
    <div className="w-full p-2 col-span-2">
      <h6
        className={cn(
          "font-medium text-sm",
          label.toLowerCase().includes("product")
            ? "text-white"
            : "text-stone-800"
        )}
      >
        {label}
      </h6>
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
            className="w-full rounded-lg cursor-pointer flex flex-col justify-center items-center border-dotted border border-gray-500 h-32"
          >
            <Input {...getInputProps()} />
            {files.length === 0 && !isUploading && !isDragOver && (
              <IconPhotoScan
                className={cn(
                  "mb-2 text-lg",
                  label.toLowerCase().includes("product")
                    ? "text-white"
                    : "text-zinc-500"
                )}
              />
            )}

            {isDragOver && (
              <IconClick
                className={cn(
                  "h-6 w-6 mb-2",
                  label.toLowerCase().includes("product")
                    ? "text-white"
                    : "text-zinc-500"
                )}
              />
            )}

            {isUploading && <Loader />}

            <div
              className={cn(
                "flex flex-col justify-center mb-2 text-sm",
                label.toLowerCase().includes("product")
                  ? "text-white"
                  : "text-zinc-700"
              )}
            >
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
            <p
              className={cn(
                "text-xs",
                label.toLowerCase().includes("product")
                  ? "text-white"
                  : "text-zinc-500"
              )}
            >
              PNG, JPG, JPEG
            </p>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
