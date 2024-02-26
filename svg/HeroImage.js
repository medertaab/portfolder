import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function HeroImage() {
  const theme = useTheme();
  const mainColor = theme.theme == "light" ? "black" : "white";

  return (
    <svg
      width="611"
      height="493"
      viewBox="0 0 611 493"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <rect
        x="0.5"
        y="0.5"
        width="610"
        height="491.161"
        rx="40.5"
        stroke={mainColor}
      />
      <rect
        x="110.936"
        y="83.3271"
        width="173.057"
        height="42.2141"
        rx="21.1071"
        stroke={mainColor}
      />
      <rect
        x="0.5"
        y="-0.5"
        width="233.077"
        height="17.0059"
        rx="8.50295"
        transform="matrix(1 0 0 -1 110.436 201.866)"
        stroke={mainColor}
      />
      <rect
        x="110.436"
        y="156.051"
        width="63.6208"
        height="18.0059"
        rx="9.00295"
        fill={mainColor}
      />
      <rect
        x="183.66"
        y="156.051"
        width="62.4204"
        height="18.0059"
        rx="9.00295"
        fill={mainColor}
      />
      <rect
        x="380.525"
        y="82.8271"
        width="120.039"
        height="120.039"
        rx="23"
        fill="#FFDF39"
      />
      <rect
        x="451.348"
        y="27.609"
        width="93.6306"
        height="16.8055"
        rx="8.40275"
        fill="#654BFF"
      />
      <rect
        x="67.222"
        y="27.609"
        width="16.8055"
        height="18.0982"
        rx="8.40275"
        fill="#FFC700"
      />
      <rect
        x="26.4086"
        y="244.88"
        width="120.039"
        height="99.6326"
        rx="23"
        fill="#95D9FF"
      />
      <rect
        x="172.857"
        y="244.88"
        width="120.039"
        height="99.6326"
        rx="23"
        fill="#654BFF"
      />
      <rect
        x="318.104"
        y="244.88"
        width="120.039"
        height="99.6326"
        rx="23"
        fill={mainColor}
      />
      <rect
        x="465.052"
        y="245.38"
        width="119.039"
        height="98.6326"
        rx="22.5"
        stroke={mainColor}
      />
    </svg>
  );
}
