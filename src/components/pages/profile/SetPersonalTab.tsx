"use client";
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
import { cn } from "@/lib/utils";
import { PatchUser } from "@/types";
import UserValidation from "@/validation/user-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

interface SetPersonalTabProps {
  data: PatchUser;
}

export default function SetPersonalTab(props: SetPersonalTabProps) {
  const { data } = props;
  const form = useForm<z.infer<typeof UserValidation.EDIT>>({
    resolver: zodResolver(UserValidation.EDIT),
    mode: "onChange",
    defaultValues: {
      ...data,
      dateOfBirth: data.dateOfBirth || new Date(),
    },
  });

  async function handleSubmit(values: z.infer<typeof UserValidation.EDIT>) {
    console.log(values);
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
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled
                    className="w-full px-3 py-2 border pointer-events-none cursor-not-allowed border-gray-300 bg-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    className="w-full px-3 py-2 border border-gray-300 bg-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      id="gender"
                      className="w-full mt-2 border focus:ring-orange-500 border-gray-300 focus:ring-2"
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
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!field.value}
                        className="data-[empty=true]:text-muted-foreground mt-2 justify-start text-left font-normal"
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
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
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
      </form>
    </Form>
  );
}
