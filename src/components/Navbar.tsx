"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import {
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconEdit,
  IconLogout,
  IconX,
  IconMapPin,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import SheetShop from "./pages/shop/SheetShop";
import { cn } from "@/lib/utils";

interface NavbarProps {
  token: Session | null;
}

export default function Navbar(props: NavbarProps) {
  const { token } = props;
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalAnimating, setIsModalAnimating] = useState(false);

  const [userData, setUserData] = useState({
    username: token?.user?.name || "User",
    fullName: token?.user?.name || "",
    email: token?.user?.email || "",
    phone: "+62 812-3456-7890",
    address: "Jl. Contoh No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12345",
    country: "Indonesia",
  });

  const [formData, setFormData] = useState(userData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setUserData(formData);
    closeModal();
    toast.success("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setFormData(userData);
    closeModal();
  };

  const openModal = () => {
    setIsEditModalOpen(true);
    setTimeout(() => setIsModalAnimating(true), 10);
  };

  const closeModal = () => {
    setIsModalAnimating(false);
    setTimeout(() => setIsEditModalOpen(false), 300);
  };

  if (pathname.includes("/auth")) return null;

  async function handleLogout() {
    setLoading(true);
    setIsMenuOpen(false);
    try {
      await signOut();
      toast.success("Logout successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("An error while logout! Please try again later!");
      } else {
        toast.error("An error occured!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <nav className="fixed w-full z-50 px-8 " id="navbar">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href={"/"}
            className="serif-font text-3xl font-bold text-stone-900"
          >
            <Image
              src={"/logojus2.png"}
              alt="Lea Juice Logo"
              width={80}
              height={80}
            />
          </Link>
          <div className="hidden md:flex space-x-12 text-sm text-stone-700">
            <Link
              href={
                pathname.includes("/shop") || pathname.includes("/product")
                  ? "/"
                  : "#home"
              }
              className="nav-link"
            >
              HOME
            </Link>
            <Link
              href={
                pathname.includes("/shop") || pathname.includes("/product")
                  ? "/shop"
                  : "#collection"
              }
              className="nav-link"
            >
              COLLECTION
            </Link>
            {pathname.includes("/shop") || pathname.includes("/product") ? (
              <Link href={"/store"} className="nav-link">
                STORE
              </Link>
            ) : (
              <>
                <Link href="#story" className="nav-link">
                  OUR STORY
                </Link>
                <Link href="#testimonials" className="nav-link">
                  REVIEWS
                </Link>
              </>
            )}
          </div>
          <div className="space-x-2">
            {!pathname.includes("/shop") && !pathname.includes("/product") ? (
              <>
                <Link
                  href={"/shop"}
                  className="bg-gradient-to-r cursor-pointer from-orange-400 to-orange-500 text-white px-8 py-[11px] rounded-full font-medium text-sm hover:shadow-lg transition-all duration-300"
                >
                  Shop Now
                </Link>
                {token ? (
                  <Button
                    variant={"destructive"}
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="cursor-pointer rounded-full px-8 py-5"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link
                    href={"/auth/login"}
                    className="border border-orange-500 cursor-pointer text-orange-500 px-8 py-[11px] rounded-full font-medium text-sm hover:border-transparent hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    Login
                  </Link>
                )}
              </>
            ) : (
              <div className="relative flex items-center gap-x-3">
                <input
                  type="search"
                  placeholder="Search.."
                  className={cn(
                    "bg-transparent border border-orange-500 transition-all px-3 py-1.5 text-sm outline-none me-2 absolute top-1/2 -translate-y-1/2 right-[100%] duration-300 rounded-sm w-full",
                    open
                      ? "w-40 md:w-56 translate-x-0"
                      : "w-0 opacity-0 pointer-events-none"
                  )}
                />
                <button
                  onClick={() => {
                    setOpen((prev) => !prev);
                  }}
                  className="cursor-pointer text-stone-700 hover:text-slate-900 transition-colors"
                >
                  <IconSearch />
                </button>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="cursor-pointer text-stone-700 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                  >
                    <IconUser />
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">
                              {userData.username}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {userData.email}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              openModal();
                              setIsMenuOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                          >
                            <IconEdit size={16} />
                            Edit Profile
                          </button>

                          <button
                            onClick={handleLogout}
                            disabled={loading}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 disabled:opacity-50"
                          >
                            <IconLogout size={16} />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <SheetShop>
                  <button className="cursor-pointer relative text-stone-700 hover:text-slate-900 transition-colors">
                    <IconShoppingCart />
                    <span className="w-6 h-6 text-xs font-medium text-white flex items-center justify-center rounded-full absolute -top-2 -right-3 bg-orange-600 aspect-square">
                      9+
                    </span>
                  </button>
                </SheetShop>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div
          className={cn(
            "fixed inset-0 backdrop-blur-sm bg-slate-900/60 flex items-center justify-center z-[100] p-4 transition-opacity duration-300",
            isModalAnimating ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            className={cn(
              "bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300",
              isModalAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
            )}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Profile
              </h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <IconX size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-4 space-y-6">
              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informasi Akun
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <IconMail size={16} />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <IconPhone size={16} />
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <IconMapPin size={20} />
                  Alamat Pengiriman
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat Lengkap
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Jalan, nomor rumah, RT/RW"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kota/Kabupaten
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Provinsi
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kode Pos
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Negara
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg hover:shadow-lg transition-all"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
