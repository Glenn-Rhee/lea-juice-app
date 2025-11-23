"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductValidation from "@/validation/product-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import UploadImage from "../../profile/UploadImage";
import { useUploadThing } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import ResponseError from "@/error/ResponseError";
import { ResponsePayload } from "@/types";

export default function DialogProduct() {
  const form = useForm<z.infer<typeof ProductValidation.PRODUCT>>({
    resolver: zodResolver(ProductValidation.PRODUCT),
    mode: "onChange",
    defaultValues: {
      product_name: "",
      price: 0,
      stock: 0,
      category: "JUICE",
      image_url: null,
    },
  });
  const [imgFile, setImgFile] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [displayPrice, setDisplayPrice] = useState("0");
  const [displayStock, setDisplayStock] = useState("0");
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("imageUpload", {
    onUploadProgress: (e) => setUploadProgress(e),
  });

  async function handleSubmit(data: z.infer<typeof ProductValidation.PRODUCT>) {
    setLoading(true);
    if (imgFile.length === 0) {
      toast.error("Please upload product image");
      return;
    }

    try {
      const uploaded = await startUpload(imgFile, {
        image: data.image_url,
      });

      if (!uploaded || uploaded.length === 0) {
        throw new ResponseError(500, "Image upload failed! Please try again.");
      }

      const dataProduct = { ...data, image_url: uploaded[0].ufsUrl };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataProduct),
      });

      const dataResponse = (await response.json()) as ResponsePayload;
      if (dataResponse.status === "failed") {
        throw new ResponseError(dataResponse.code, dataResponse.message);
      }

      form.reset();
      setDisplayPrice("0");
      setDisplayStock("0");
      form.reset({ description: "" });
      setImgFile([]);
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
      setUploadProgress(undefined);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="cursor-pointer">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid grid-cols-2 gap-4 w-full mt-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl className="mt-1">
                    <Input {...field} type="text" />
                  </FormControl>
                  <div className="w-full">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl className="mt-1">
                    <Input
                      {...field}
                      value={displayPrice}
                      onChange={(e) => {
                        let raw = e.target.value;
                        raw = raw.replace(/\D/g, "");
                        if (raw === "") {
                          setDisplayPrice("");
                          field.onChange(undefined);
                          return;
                        }

                        raw = raw.replace(/^0+/, "");
                        if (raw === "") {
                          raw = "0";
                        }

                        const formatted = raw.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          "."
                        );
                        setDisplayPrice(formatted);
                        field.onChange(Number(raw));
                      }}
                      type="text"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <div className="w-full">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl className="mt-1">
                    <Input
                      {...field}
                      value={displayStock}
                      onChange={(e) => {
                        let raw = e.target.value;
                        raw = raw.replace(/\D/g, "");
                        if (raw === "") {
                          setDisplayStock("");
                          field.onChange(undefined);
                          return;
                        }

                        raw = raw.replace(/^0+/, "");
                        if (raw === "") {
                          raw = "0";
                        }

                        const formatted = raw.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          "."
                        );
                        setDisplayStock(formatted);
                        field.onChange(Number(raw));
                      }}
                      type="text"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <div className="w-full">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl className="mt-1">
                    <Select
                      {...field}
                      onValueChange={(v) => field.onChange(v.toUpperCase())}
                      value={field.value.toLowerCase()}
                    >
                      <SelectTrigger className="h-full mt-1 w-full px-3 py-1 bg-red-900 rounded-md">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          <SelectItem value="juice">Juice</SelectItem>
                          <SelectItem value="fruit">Fruit</SelectItem>
                          <SelectItem value="salad">Salad</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <div className="w-full">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="p-2 col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </FormControl>
                  <div className="w-full">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <UploadImage
              uploadProgress={uploadProgress}
              files={imgFile}
              isUploading={isUploading}
              setFiles={setImgFile}
              label="Product Image"
            />
            <Button
              disabled={loading}
              type="submit"
              className="col-span-2 cursor-pointer font-semibold"
            >
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
