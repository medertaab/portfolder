import React from "react";
import SettingsButton from "./SettingsButton";

export default function SettingsNavigation() {
  const buttons = {
    display: "Your info",
    socials: "Socials",
    description: "Description"
  };

  return (
    <ul className="relative sm:w-[90%] sm:max-w-2xl flex m-auto text-base sm:text-lg font-semibold [&_li]:text-center [&_li]:cursor-pointer">
      {Object.keys(buttons).map((it, id) => {
        return <SettingsButton type={it} title={buttons[it]} key={id}/>;
      })}
    </ul>
  );
}
