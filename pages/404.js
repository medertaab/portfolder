import React from "react";
import Link from "next/link";
import PageLayout from "../components/PageLayout";

export default function Custom404() {
  
  return (
    <PageLayout>
      <div className="w-full flex flex-col justify-center items-center">
        <span className="text-[10rem]">🏞️</span>
        <span className="text-3xl">404</span>
        <h1 className="text-lg">Oops, this page doesn&apos;t exist 😅</h1>
        <Link href="/" className="underline hover:text-bgAccent">
          Go to the main page
        </Link>
      </div>
    </PageLayout>
  );
}
