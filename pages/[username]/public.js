import React, { useState} from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import Portfolio from "../../components/Portfolio";

export default function PortfolioPage() {
  const router = useRouter();
  const username = router.query.username;
  const {theme} = useAuth()

  return (
    <div className={`theme-${theme} bg-bgPrimary`}>
      <Portfolio username={username} publicMode={true}/>
    </div>
  );
}
