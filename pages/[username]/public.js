import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import Head from "next/head";
import Portfolio from "../../components/portfolio/Portfolio";
import { Figtree } from "next/font/google"
const figtree = Figtree({ subsets: ["latin"]});

export default function PortfolioPage() {
  const router = useRouter();
  const query = router.query?.username
  const username = query.toLowerCase();
  const { theme } = useTheme()

  return (
    <div className={`${figtree.className} theme-${theme} bg-bgPrimary`}>
      <Head>
        <title>{`${query}`} | PortFolder</title>
        <meta name="description" content={`${query}'s compact portfolio`} />
      </Head>
      <Portfolio username={username} publicMode={true}/>
    </div>
  );
}

