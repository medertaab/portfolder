import React from "react";

export default function Card(props) {
  const { data } = props;
  return (
    <li className="flex flex-col justify-start h-full w-72 flex-1  p-8 text-center border-opacity-70 [&>svg]:h-10 [&>svg]:m-auto [&>svg]:fill-textPrimary">
      {data.image}
      <p className="mt-6 text-sm">{data.text}</p>
    </li>
  );
}
