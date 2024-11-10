import React from "react";

export default function Card(props) {
  const { data } = props;
  return (
    <li className="flex flex-col justify-start h-full max-w-[19rem] flex-1 p-8 text-center border-opacity-70 [&>svg]:h-10 [&>svg]:m-auto [&>svg]:fill-textPrimary border-[1px] border-textPrimary rounded-3xl gap-2 shadow-[3px_4px_0px_0px] shadow-purple">
      {data.image}
      <h4 className="font-semibold text-3xl mt-2">{data.title}</h4>
      <p className="">{data.text}</p>
    </li>
  );
}
