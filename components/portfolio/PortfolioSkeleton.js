import React from "react";
import Header from "./Header";
import Gallery from "./Gallery";
import Description from "./Description";

export default function PortfolioSkeleton() {
  const socialButton = (
    <button className="h-9 w-9 text-xl rounded-full mx-1 bg-textPrimary"></button>
  );
  return (
    <div className="animate-pulse">
      <div className="opacity-20">
        {/* Header */}
        <div className="relative w-full">
          <div className="grid relative w-fit m-auto justify-center items-center sm:grid-cols-[200px_minmax(150px,_250px)]">
            <div className="h-[200px] w-[200px] bg-textPrimary"></div>
            <div className="break-words">
              <div className="w-20 h-6 bg-textPrimary m-auto"></div>
              <div className="bg-textPrimary h-8 mx-2 mt-2"></div>
              <div className="bg-textPrimary h-4 mx-10 mt-2"></div>
              <button className="bg-textPrimary h-8 w-24 rounded m-2"></button>
              <button className="bg-textPrimary h-8 w-24 rounded m-2"></button>
            </div>
          </div>
          <div className="relative m-auto flex w-fit h-fit gap-2 justify-center mt-4">
            {[1, 2, 3, 4, 5].map((it) => {
              return socialButton;
            })}
          </div>
        </div>
        {/* Gallery */}
        <div className="p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] grid-cols-1 sm:gap-4 gap-2 justify-between mt-2">
          <div className="h-80 bg-textPrimary"></div>
          <div className="h-80 bg-textPrimary"></div>
          <div className="h-80 bg-textPrimary"></div>
          <div className="h-80 bg-textPrimary"></div>
          <div className="h-80 bg-textPrimary"></div>
        </div>
        {/* Description */}
        <div className="my-2 p-5 relative m-auto max-w-xl border-2 border-textPrimary rounded grid sm:grid-flow-col sm:grid-cols-[2fr,_3fr]">
          <div className="sm:max-w-full max-w-[75%] sm:m-0 m-auto">
            <div className="bg-textPrimary w-[200px] h-[200px]"></div>
          </div>
          <div className="text-left pl-5">
            <div className="bg-textPrimary w-1/2 h-8 mb-2"></div>
            <div className="bg-textPrimary w-full h-4 mb-2"></div>
            <div className="bg-textPrimary w-full h-4 mb-2"></div>
            <div className="bg-textPrimary w-full h-4 mb-2"></div>
            <div className="bg-textPrimary w-full h-4 mb-2"></div>
            <div className="bg-textPrimary w-3/4 h-4 mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
