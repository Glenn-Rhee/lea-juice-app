"use client";
import Loader from "@/components/icons/Loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResponseError from "@/error/ResponseError";
import { cn } from "@/lib/utils";
import { DataUser, ResponsePayload } from "@/types";
import UserValidation from "@/validation/user-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import UploadImage from "./UploadImage";
import { useUploadThing } from "@/lib/uploadthing";

interface SetPersonalTabProps {
  data: DataUser;
}

export default function SetPersonalTab(props: SetPersonalTabProps) {
  const { data } = props;
  const form = useForm<z.infer<typeof UserValidation.EDIT>>({
    resolver: zodResolver(UserValidation.EDIT),
    mode: "onChange",
    defaultValues: {
      ...data,
      dateOfBirth:
        new Date(data.dateOfBirth as unknown as string) || new Date(),
    },
  });
  const [loading, setLoading] = useState(false);
  const [imgFile, setImgFile] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | undefined>();
  const { startUpload, isUploading } = useUploadThing("imageUpload", {
    onUploadProgress: (e) => setUploadProgress(e),
  });

  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof UserValidation.EDIT>) {
    setLoading(true);
    try {
      const now = new Date().getFullYear();
      const userDate = new Date(values.dateOfBirth).getFullYear();
      const age = now - userDate;
      if (age < 18) {
        throw new ResponseError(403, "Oops! Minimum age of user is 18");
      }

      let dataUser = { ...values };
      if (imgFile.length > 0) {
        const uploaded = await startUpload(imgFile, {
          image: data.image,
        });
        if (!uploaded || uploaded.length === 0) {
          throw new ResponseError(
            500,
            "Image upload failed! Please try again."
          );
        }

        dataUser = { ...values, image: uploaded[0].ufsUrl };
      }

      const response = await fetch("/api/user", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(dataUser),
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.code, dataResponse.message);
      }

      toast.success(dataResponse.message);
      router.refresh();
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="w-full mt-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <h3 className="font-semibold text-xl text-gray-800">
          Personal Identity :
        </h3>
        <div className="w-full grid grid-cols-2 gap-x-3">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Fullname</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.fullname ? "opacity-100" : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.username ? "opacity-100" : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled
                    className="w-full px-3 py-2 border pointer-events-none cursor-not-allowed border-gray-300 bg-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.email ? "opacity-100" : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    className="w-full px-3 py-2 border border-gray-300 bg-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.phoneNumber
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      id="gender"
                      className="w-full mt-2 border focus:ring-orange-500 text-stone-800 border-gray-300 focus:ring-2"
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray-300">
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="UNKNOWN">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.gender ? "opacity-100" : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Date of Birth</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        data-empty={!field.value}
                        className="data-[empty=true]:text-muted-foreground mt-2 justify-start text-stone-800 flex items-center text-sm gap-x-2 px-2 py-2 rounded-md text-left font-normal cursor-pointer border border-gray-300"
                      >
                        <CalendarIcon size={20} />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.dateOfBirth
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="p-2 col-span-2">
                <FormLabel className="text-stone-800">Bio</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.bio ? "opacity-100" : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <UploadImage
            label="Profile Picture"
            files={imgFile}
            isUploading={isUploading}
            setFiles={setImgFile}
            uploadProgress={uploadProgress}
          />
        </div>
        <h3 className="font-semibold text-xl text-gray-800">
          Shipping Address :
        </h3>
        <div className="w-full grid grid-cols-2 gap-x-3">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.address ? "opacity-100" : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.city ? "opacity-100" : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Province</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.province ? "opacity-100" : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormLabel className="text-stone-800">Postal Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    type="text"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-stone-800"
                  />
                </FormControl>
                <div
                  className={cn(
                    "w-full h-1",
                    form.formState.errors.postalCode
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                >
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full px-3 flex items-center justify-center gap-x-3 bg-gradient-to-br py-6 from-orange-400 via-orange-500 to-orange-600 text-white font-semibold text-lg rounded-lg mt-4 cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-200"
        >
          {loading && <Loader />}
          Save
        </Button>
      </form>
    </Form>
  );
}
