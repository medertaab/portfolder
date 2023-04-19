import React from "react";

export default function Slide1() {
  return (
    <div className="fade-in fade-out">
      {/* Mobile view */}
      <div className="relative border-2 border-bgAccent rounded w-2/5 p-2 m-auto sm:hidden block">
        
        {/* Modal */}
        <div className="absolute inset-0 bg-textPrimary bg-opacity-0 h-full w-full z-10 flex justify-center items-center">
          <div className="bg-bgPrimary rounded p-2 w-4/5 shadowy-2">
            <div className="w-1/2 aspect-square bg-rose-600 rounded m-auto"></div>
            <div className="h-4 border-[1px] border-textPrimary mt-2 m-auto rounded relative">
              <span className="text-xs ml-1 opacity-80 absolute">https://...img.jpg</span>
            </div>
            <div className="h-4 border-[1px] border-textPrimary mt-2 m-auto rounded relative">
              <span className="text-xs ml-1 opacity-80 absolute">Work Title</span>
            </div>
            <div className="m-auto flex justify-center mt-1">
              <div className="inline-block h-4 w-11 border-[1px] border-gray-500 rounded mt-2 m-1"></div>
              <div className="inline-block h-4 w-11 bg-bgAccent rounded mt-2 m-1"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="relative w-full">
          <div className="grid relative w-fit m-auto mt-2 justify-center items-center">
            <div className="h-[40px] w-[40px] rounded bg-gradient-to-br from-violet-600 to-indigo-600 m-auto"></div>
            <div className="break-words mt-2">
              <div className="w-10 h-3 bg-textPrimary opacity-20 m-auto rounded"></div>
              <div className="bg-textPrimary opacity-20 h-3 w-2/3 m-auto mt-1 rounded"></div>
              <div className="flex justify-center">
                <div className="inline-block border-[1px] border-bgAccent h-4 w-12 rounded m-1"></div>
                <div className="inline-block border-[1px] border-bgAccent h-4 w-12 rounded m-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="p-2 grid grid-cols-1 gap-2 justify-between my-1 [&>*]:rounded">
          <div className="bg-violet-600 h-16"></div>
          <div className="bg-bgAccent h-16"></div>
        </div>

        <div className="h-4 mt-[-0.25rem]"></div>
      </div>

      {/* Wide view */}
      <div className="relative border-2 border-bgAccent rounded w-full max-w-[800px] aspect-video p-5 sm:block hidden">
        
        {/* Modal */}
        <div className="absolute inset-0 bg-textPrimary bg-opacity-0 h-full w-full z-10 flex justify-center items-center">
          <div className="bg-bgPrimary h-56 w-56 rounded p-2 shadowy-2">
            <div className="w-1/2 aspect-square bg-rose-600 rounded m-auto"></div>
            <div className="h-6 border-[1px] border-textPrimary mt-2 m-auto rounded">
              <span className="text-xs ml-2 opacity-80">https://...link.to.my.work.jpg</span>
            </div>
            <div className="h-6 border-[1px] border-textPrimary mt-2 m-auto rounded">
              <span className="text-xs ml-2 opacity-80">Work Title</span>
            </div>
            <div className="m-auto flex justify-center mt-1">
              <div className="inline-block h-6 w-1/3 border-[1px] border-gray-500 rounded mt-2 m-1"></div>
              <div className="inline-block h-6 w-1/3 bg-bgAccent rounded mt-2 m-1"></div>
            </div>
            
          </div>
        </div>

        {/* Header */}
        <div className="relative w-full">
          <div className="grid relative w-fit m-auto mt-2 justify-center items-center sm:grid-cols-[200px_minmax(150px,_250px)]">
            <div className="h-[100px] w-[100px] rounded bg-gradient-to-br from-violet-600 to-indigo-600 m-auto"></div>
            <div className="break-words mt-3">
              <div className="w-20 h-6 bg-textPrimary opacity-20 m-auto rounded"></div>
              <div className="bg-textPrimary opacity-20 h-8 mx-2 mt-2 rounded"></div>
              <div className="flex justify-center">
                <div className="inline-block border-2 border-bgAccent h-6 w-16 rounded m-2"></div>
                <div className="inline-block border-2 border-bgAccent h-6 w-16 rounded m-2"></div>
              </div>
              <div className="h-5"></div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="p-2 grid sm:grid-cols-[repeat(auto-fill,_minmax(120px,1fr))] grid-cols-1 sm:gap-4 gap-2 justify-between my-2 [&>*]:rounded">
          <div className="bg-indigo-600 sm:h-28 sm:block hidden"></div>
          <div className="bg-orange-500 sm:h-28 sm:block hidden"></div>
          <div className="bg-purple-900 sm:h-28 sm:block hidden"></div>
          <div className="bg-violet-600 sm:h-28 sm:block hidden"></div>
          <div className="bg-yellow-500 sm:h-28 sm:block hidden"></div>
          <div className="bg-red-400 sm:h-28 h-52"></div>
          <div className="bg-indigo-500 sm:h-28 h-52"></div>
          <div className="bg-red-500 sm:h-28 h-52"></div>
        </div>
      </div>
      <p className="w-full text-center mt-2">Add by linking to your images - we don&apos;t store your files</p>
    </div>
  );
}
