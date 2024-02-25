import React from "react";

export default function Card(props) {
  const { data } = props;
  return (
    <div className="flex flex-col justify-start h-full w-72 flex-1 rounded-2xl p-8 border-[1px] border-textPrimary text-center border-opacity-70 [&>svg]:h-10 [&>svg]:m-auto [&>svg]:fill-textPrimary">
      {data.image}
      <p className="mt-6 text-sm">{data.text}</p>
      </div>
  );
}
