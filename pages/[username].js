import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetchPortfolioData from "../hooks/fetchPortfolioData";
import Header from "../components/Header";
import Portfolio from "../components/Portfolio";

export default function PortfolioPage() {
  const router = useRouter();
  const username = router.query.username;

  const {loading, error, portfolioData} = useFetchPortfolioData(username)

  return (
    <div>
      <Portfolio username={username}/>
    </div>
  );
}
