import React from "react";

export default function HowToCard(props) {
  const { data, id } = props;
  return (
    <li className="flex flex-col justify-start h-full w-[19rem] flex-1 p-8 text-center border-opacity-70 [&>svg]:h-10 [&>svg]:m-auto [&>svg]:fill-textPrimary border-[1px] border-textPrimary rounded-3xl gap-2 shadow-[3px_4px_0px_0px] shadow-purple">
      <span className="m-auto bg-purple h-10 w-10 rounded-full flex justify-center items-center text-white text-2xl font-semibold">
        {id + 1}
      </span>
        <h4 className="font-semibold text-xl mt-2">{data.title}</h4>
        <p>{data.text}</p>
    </li>
  );
}
