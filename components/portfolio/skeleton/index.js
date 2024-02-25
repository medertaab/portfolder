import React from "react";

export default function Skeleton() {
  return (
    <div className="animate-pulse pt-2">
      <div className="opacity-20">
        {/* Header */}
        <div className="w-full pt-2 mt-8">
          <div className="relative max-w-[40rem] m-auto flex flex-col-reverse items-center sm:flex-row sm:items-start">
            {/* Name, title and main links */}
            <div className="relative min-h-[180px] break-words grow flex flex-col justify-center py-4 tracking-tight text-center sm:text-start">
              <div className="h-[3rem] w-[20rem] bg-textPrimary"></div>

              <div className="opacity-75 mt-3 w-[90%] h-[1.2rem] bg-textPrimary"></div>
              <div className="opacity-75 mt-1 w-[75%] h-[1.2rem] bg-textPrimary"></div>

              <div className="w-full flex gap-4 mt-3 text-[0.9rem] h-[2.5rem]">
                <div className="inline-blocktext-center w-32 py-2 border-2 border-textPrimary bg-textPrimary text-bgPrimary rounded-full transition hover:-translate-y-1 h-full"></div>

                <div className="inline-block text-center w-32 py-2 border-2 border-textPrimary bg-textPrimary text-bgPrimary rounded-full transition hover:-translate-y-1 h-full"></div>
              </div>
            </div>

            <div className="size-[180px] rounded-[2rem] bg-textPrimary"></div>
          </div>

          <div className="relative border-2 border-textPrimary rounded-2xl max-w-[40rem] m-auto flex flex-wrap gap-5 justify-center p-3 mx-2 mt-0 sm:mx-auto sm:mt-4 h-[3.2rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-textPrimary h-8 absolute right-2 transform top-1/2 -translate-y-1/2"
              viewBox="0 0 16 16"
            >
              <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z" />
            </svg>
          </div>
        </div>

        {/* Gallery */}
        <div className="p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] grid-cols-1 sm:gap-4 gap-2 justify-between mt-12">
          <div className="h-80 bg-textPrimary"></div>
          <div className="h-80 bg-textPrimary"></div>
          <div className="h-80 bg-textPrimary"></div>
          <div className="h-80 bg-textPrimary"></div>
          <div className="h-80 bg-textPrimary"></div>
        </div>

        {/* Description */}
        <div className="max-w-[40rem] min-h-52 m-4 p-5 relative z-20 sm:m-auto sm:mt-12 border-[1px] border-textPrimary rounded-2xl grid sm:grid-flow-col sm:grid-cols-[2fr,_3fr]h-52"></div>
      </div>
    </div>
  );
}
