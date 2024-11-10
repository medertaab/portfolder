import React from "react";
import HowToCard from "./HowToCard";
import data from "./howToData.json"

export default function HowTo() {
  return (
    <div className="flex flex-col text-center mt-32">
      <h3 className="text-3xl font-semibold mb-8">
        Showcasing Your Work Is Easy
      </h3>
      <ol
        className="flex min-h-48 max-w-[80%] m-auto flex-wrap md:flex-row flex-col justify-around gap-10 fade-in"
        style={{ opacity: 0, animationDelay: "750ms" }}
      >
        {data.map((data, id) => {
          return <HowToCard data={data} key={id} id={id} />;
        })}
      </ol>
    </div>
  );
}
