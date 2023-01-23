import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Portfolio from "../../components/Portfolio";
import { useAuth } from "../../context/AuthContext";

export default function PortfolioPage() {
  const router = useRouter();
  const username = router.query.username;
  const {theme} = useAuth()

  return (
    <div className={`theme-${theme} bg-bgPrimary`}>
      <Portfolio username={username}/>
    </div>
  );
}
