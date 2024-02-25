import React from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./Navbar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { Figtree } from "next/font/google";
const figtree = Figtree({ subsets: ["latin"] });
import useFetchPortfolioData from "../../hooks/fetchPortfolioData";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsLayout(props) {
  const { children } = props;
  const { currentUser, logout } = useAuth();
  const currentPage = useRouter().asPath;

  const { portfolioData } = useFetchPortfolioData(currentUser?.displayName);
  const { theme } = useTheme();

  return (
    <div
      className={`theme-${theme} theme-${portfolioData?.settings?.theme} bg-bgPrimary text-textPrimary`}
    >
      <Head>
        <title>{props.title} | PortFolder</title>
        <meta
          name="description"
          content="Portfolder: Compact portfolio maker"
        />
      </Head>

      <Navbar />

      <div
        className={`${figtree.className} min-h-[calc(100vh-2.5rem)] max-w-screen-2xl m-auto`}
      >
        <ul className="sm:flex sm:fixed h-full w-[250px] bg-bgPrimary hidden p-7 flex-col gap-2 text-lg [&>*]:p-1 basis-[250px] max-h-[calc(100vh-2.5rem)] border-r-2 border-bgSecondary">
          <li
            className={`${
              currentPage === "/manage"
                ? "text-bgAccent"
                : "hover:text-bgAccent"
            } duration-150`}
          >
            <Link href="/manage">
              <i className="fa-solid fa-palette mr-2"></i> Manage page
            </Link>
          </li>
          <li
            className={`${
              currentPage === "/settings"
                ? "text-bgAccent"
                : "hover:text-bgAccent"
            } duration-150`}
          >
            <Link href="/settings">
              <i className="fa-solid fa-gear mr-2"></i> Account settings
            </Link>
          </li>
          <li className="hover:text-bgAccent duration-150">
            <Link href={`/${currentUser.displayName}`}>
              <i className="fa-solid fa-house mr-2"></i> Your page
            </Link>
          </li>
          <li className="hover:text-bgAccent duration-150 mt-auto mb-4">
            <button onClick={() => logout()}>
              <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
            </button>
          </li>
        </ul>

        <div className="sm:ml-[250px] sm:p-0 p-4 min-h-full">{children}</div>
      </div>
    </div>
  );
}
