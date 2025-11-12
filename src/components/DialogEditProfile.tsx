"use client";
import { IconEdit, IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { UserDetail } from "./UserProfile";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserValidation from "@/validation/user-validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import TabsEditProfile from "./TabsEditProfile";

interface DialogEditProfileProps {
  userData: UserDetail;
}

export default function DialogEditProfile(props: DialogEditProfileProps) {
  const { userData } = props;
  const [tab, setTab] = useState<"personal" | "address">("personal");
  const form = useForm<z.infer<typeof UserValidation.EDIT>>({
    resolver: zodResolver(UserValidation.EDIT),
    mode: "onChange",
    defaultValues: {
      address: "",
      bio: "",
      city: "",
      dateOfBirth: new Date(),
      email: userData.email,
      fullname: userData.fullName,
      gender: "UNKNOWN",
      phoneNumber: "",
      postalCode: "",
      province: "",
      username: userData.username,
    },
  });

  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    const regex = /^\d+$/;
    // day
    if (date.day.trim() !== "") {
      form.clearErrors("dateOfBirth");
      if (regex.test(date.day)) {
        const dayNum = Number(date.day);

        if (dayNum < 1 || dayNum > 31) {
          setDate((prev) => ({ ...prev, day: "" }));
          form.setError("dateOfBirth", {
            type: "validate",
            message: "Day must be between 1 - 31",
          });
        }
      } else {
        form.setError("dateOfBirth", {
          type: "validate",
          message: "Day must be a number",
        });
        setDate((prev) => ({ ...prev, day: "" }));
      }
    }

    // month
    if (date.month.trim() !== "") {
      form.clearErrors("dateOfBirth");

      if (regex.test(date.month)) {
        const monthNum = Number(date.month);
        if (monthNum < 1 || monthNum > 12) {
          form.setError("dateOfBirth", {
            type: "validate",
            message: "A month must be between 1 - 12",
          });
          setDate((prev) => ({ ...prev, month: "" }));
        }
      } else {
        form.setError("dateOfBirth", {
          type: "validate",
          message: "A month must be a number",
        });
        setDate((prev) => ({ ...prev, month: "" }));
      }
    }

    // year
    if (date.year.trim() !== "") {
      form.clearErrors("dateOfBirth");

      if (regex.test(date.year)) {
        const yearNum = Number(date.year);
        if (yearNum < 1 || yearNum > new Date().getFullYear() - 18) {
          form.setError("dateOfBirth", {
            type: "validate",
            message: "Minimum of your age must be 18",
          });
          setDate((prev) => ({ ...prev, year: "" }));
        }
      } else {
        form.setError("dateOfBirth", {
          type: "validate",
          message: "Year must be a number",
        });
        setDate((prev) => ({ ...prev, year: "" }));
      }
    }
  }, [date, form]);

  async function handleEdit(values: z.infer<typeof UserValidation.EDIT>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="w-full  py-2 text-left text-sm text-gray-700 flex items-center gap-3">
          <IconEdit size={16} />
          Edit Profile
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-xl text-center font-semibold text-gray-900">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <TabsEditProfile tab={tab} setTab={setTab} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              date.year.trim() !== "" &&
              date.month.trim() !== "" &&
              date.day.trim() !== ""
            ) {
              const dateUser = new Date(
                Number(date.year),
                Number(date.month) - 1,
                Number(date.day)
              );
              form.setValue("dateOfBirth", dateUser);
              form.handleSubmit(handleEdit)();
            } else {
              form.setError("dateOfBirth", {
                type: "validate",
                message: "Please fill your date properly",
              });
            }
          }}
          className="py-4 space-y-6"
        >
          {tab === "personal" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informasi Akun
              </h3>
              <div className="space-y-4">
                <div className="w-full grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      {...form.register("username")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {form.formState.errors.username && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {form.formState.errors.username.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="fullname"
                      type="text"
                      {...form.register("fullname")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {form.formState.errors.fullname && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {form.formState.errors.fullname.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
                    >
                      <IconMail size={16} />
                      Email
                    </label>
                    <input
                      type="email"
                      disabled
                      id="email"
                      {...form.register("email")}
                      className="w-full px-3 py-2 border pointer-events-none cursor-not-allowed border-gray-300 bg-gray-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
                    >
                      <IconPhone size={16} />
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="phoneNumber"
                      {...form.register("phoneNumber")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {form.formState.errors.phoneNumber && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {form.formState.errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-x-3">
                  <div className="">
                    <label
                      htmlFor="gender"
                      className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
                    >
                      Gender
                    </label>
                    <Controller
                      name="gender"
                      control={form.control}
                      render={({ field }) => (
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
                      )}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      Date of birth
                    </label>
                    <div className="w-full mt-1 py-1 grid grid-cols-3 gap-x-2">
                      <input
                        value={date.day}
                        onChange={(e) =>
                          setDate((val) => ({ ...val, day: e.target.value }))
                        }
                        onBlur={() => {
                          if (date.day.length === 1) {
                            setDate((prev) => ({
                              ...prev,
                              day: "0" + date.day,
                            }));
                          }
                        }}
                        className="border rounded-md focus:outline-none text-center focus:ring-orange-500 focus:ring-2 text-sm focus:border-gray-300 border-gray-300 px-2 py-[7px]"
                        type="text"
                        inputMode="numeric"
                        maxLength={2}
                        placeholder="DD"
                      />
                      <input
                        value={date.month}
                        onChange={(e) =>
                          setDate((val) => ({ ...val, month: e.target.value }))
                        }
                        onBlur={() => {
                          if (date.month.length === 1) {
                            setDate((prev) => ({
                              ...prev,
                              month: "0" + date.month,
                            }));
                          }
                        }}
                        className="border rounded-md focus:outline-none text-center focus:ring-orange-500 focus:ring-2 text-sm focus:border-gray-300 border-gray-300 px-2 py-[7px]"
                        type="text"
                        inputMode="numeric"
                        maxLength={2}
                        placeholder="MM"
                      />
                      <input
                        value={date.year}
                        onChange={(e) =>
                          setDate((val) => ({ ...val, year: e.target.value }))
                        }
                        className="border rounded-md focus:outline-none text-center focus:ring-orange-500 focus:ring-2 text-sm focus:border-gray-300 border-gray-300 px-2 py-[7px]"
                        type="text"
                        inputMode="numeric"
                        placeholder="YYYY"
                        maxLength={4}
                      />
                    </div>
                    {form.formState.errors.dateOfBirth && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {form.formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
                  >
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    id="bio"
                    {...form.register("bio")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {form.formState.errors.bio && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {form.formState.errors.bio.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "address" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <IconMapPin size={20} />
                Alamat Pengiriman
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows={3}
                    id="address"
                    {...form.register("address")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Jalan, nomor rumah, RT/RW"
                  />
                  {form.formState.errors.address && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Kota/Kabupaten
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...form.register("city")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {form.formState.errors.city && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="provincce"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Provinsi
                    </label>
                    <input
                      type="text"
                      id="provincce"
                      {...form.register("province")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {form.formState.errors.province && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {form.formState.errors.province.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      {...form.register("postalCode")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    {form.formState.errors.postalCode && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {form.formState.errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (
                date.year.trim() !== "" &&
                date.month.trim() !== "" &&
                date.day.trim() !== ""
              ) {
                const dateUser = new Date(
                  Number(date.year),
                  Number(date.month) - 1,
                  Number(date.day)
                );
                form.setValue("dateOfBirth", dateUser);
                form.handleSubmit(handleEdit)();
              } else {
                form.setError("dateOfBirth", {
                  type: "validate",
                  message: "Please fill your date properly",
                });
              }
            }}
            className="font-semibold bg-orange-500 py-2 md:py-0 hover:bg-orange-600 transition-colors duration-200 text-white px-4 rounded-sm cursor-pointer"
            type="submit"
          >
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
