import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import Head from "next/head";
import Portfolio from "../../components/portfolio";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function PortfolioPage() {
  const router = useRouter();
  const query = router.query?.username;
  const username = query.toLowerCase();
  const { theme } = useTheme();

  return (
    <div className={`${inter.className} theme-${theme} bg-bgPrimary`}>
      <Head>
        <title>{`${query}`} | portFolder</title>
        <meta name="description" content={`${query}'s compact portfolio`} />
      </Head>
      
      <Portfolio username={username} />
    </div>
  );
}
