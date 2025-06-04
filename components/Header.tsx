"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const player = usePlayer();
  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={twMerge(
        `
        h-fit
        bg-cover 
        bg-center 
        p-6 
        relative
      `,
        className
      )}
      style={{
        backgroundImage: "url('/images/header-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10">
        <div className="w-full mb-4 flex items-center justify-between">
          <div className="hidden md:flex gap-x-2 items-center">
            <button
              onClick={() => router.back()}
              className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:bg-slate-700 transition"
            >
              <RxCaretLeft className="text-cyan-500" size={35} />
            </button>
            <button
              onClick={() => router.forward()}
              className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:bg-slate-700 transition"
            >
              <RxCaretRight className="text-cyan-500" size={35} />
            </button>
          </div>

          <div className="flex md:hidden gap-x-2 items-center">
            <button
              onClick={() => router.push("/")}
              className="rounded-full p-2 bg-white flex items-center justify-center cursor-pointer hover:opacity-75 transition"
            >
              <HiHome className="text-black" size={20} />
            </button>
            <button
              onClick={() => router.push("/search")}
              className="rounded-full p-2 bg-white flex items-center justify-center cursor-pointer hover:opacity-75 transition"
            >
              <BiSearch className="text-black" size={20} />
            </button>
          </div>

          <div className="flex justify-between items-center gap-x-4">
            {user ? (
              <div className="flex gap-x-4 items-center">
                <Button onClick={handleLogout} className="bg-white px-6 py-2">
                  Logout
                </Button>
                <Button
                  onClick={() => router.push("/account")}
                  className="bg-white"
                >
                  <FaUserAlt />
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <Button
                    onClick={authModal.onOpen}
                    className="bg-transparent text-white font-medium"
                  >
                    Sign up
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={authModal.onOpen}
                    className="bg-white px-6 py-2"
                  >
                    Login
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Header;
