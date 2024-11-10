import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/router";

export default function Footer() {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const isMainPage = router.pathname == "/";

  return (
    <footer
      className={`theme-${theme} bg-bgPrimary text-textPrimary text-sm border-t-[1px] border-gray-300 p-3 flex flex-row flex-wrap bottom-0 mt-16 w-full`}
    >
      <div className="w-full max-w-screen-2xl m-auto flex justify-between  items-center">
        {/* Left side */}
        <div>
          <div className="flex gap-2 items-center flex-wrap w-full mt-4">
            <Image src="/icon.png" width={30} height={30} alt="Website logo" />
            <h5 className="text-xl flex-grow opacity-60">portfolder</h5>
          </div>
          <p className="text-left opacity-60">Compact portfolio maker</p>
        </div>

        {/* Right side */}
        <div className="text-right">
          <p className="opacity-60 mt-8">
            portfolder @ {new Date().getFullYear()}{" "}
            <Link href="http://medertaab.com/" className="underline">
              medertaab
            </Link>
          </p>
          {!currentUser && router.asPath !== "/login" && !isMainPage && (
            <Link href="/">
              <button className="border-b-2 px-1 border-bgPrimary duration-150 hover:opacity-100 opacity-60">
                Start your own portfolio
              </button>
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
