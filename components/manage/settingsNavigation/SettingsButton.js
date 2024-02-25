import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function SettingsButton(props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function updateForm(type) {
    router.replace(
      {
        query: { type: type },
      },
      undefined
    );
  }

  const { type, title } = props;
  return (
    <li
      onClick={() => updateForm(type)}
      className="p-2 hover:text-bgAccent duration-150 w-1/3"
    >
      <button
        type="button"
        className={`${
          searchParams.get("type") === type && "border-b-2"
        } border-bgAccent w-full p-2`}
      >
        {title}
      </button>
    </li>
  );
}
