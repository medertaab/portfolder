import React from "react";

export default function ThemeForm(props) {
  const { register } = props;

  return (
    <section className="pb-6 w-full [&_input]:px-2 [&_input]:h-10 [&_input]:bg-bgSecondary [&_input]:w-full [&_input]:border-[1px] [&_input]:rounded [&_input]:border-gray-400 [&_input]:mt-1 [&_input:focus]:outline-none">
      <legend>Portfolio theme</legend>
      <fieldset className="pt-2 flex w-[300px] justify-between m-auto [&_input]:max-w-5 [&_input]:max-h-5 [&_input]:accent-bgAccent">
        <label className="cursor-pointer flex flex-col justify-center">
          <div className="w-10 h-10 theme-orange bg-bgAccent"></div>
          <input
            {...register("settings.theme")}
            className="max-w-5 max-h-5 m-auto w-min"
            type="radio"
            id="orangeTheme"
            value="orange"
            name="settings.theme"
          ></input>
        </label>

        <label className="cursor-pointer flex flex-col justify-center">
          <div className="w-10 h-10 theme-purple bg-textAccent"></div>
          <input
            {...register("settings.theme")}
            className="max-w-5 max-h-5 m-auto w-min"
            type="radio"
            id="purpleTheme"
            value="purple"
            name="settings.theme"
          ></input>
        </label>

        <label className="cursor-pointer flex flex-col justify-center">
          <div className="w-10 h-10 theme-gray bg-bgAccent"></div>
          <input
            {...register("settings.theme")}
            className="max-w-5 max-h-5 w-min"
            type="radio"
            id="grayTheme"
            value="gray"
            name="settings.theme"
          ></input>
        </label>
      </fieldset>

      <div className="divider"></div>

      <label>Portfolio view</label>
      <fieldset className="pt-2 flex justify-between m-auto">
        <label className="cursor-pointer flex flex-col items-center justify-center grow shrink basis-0">
          <div className="scale-y-[1.12]">
            <i className="ri-layout-grid-fill text-5xl text-gray-400"></i>
          </div>
          <p>Static grid</p>
          <p className="text-xs text-center text-textPrimary text-opacity-80">
            (All thumbnails will be square)
          </p>
          <input
            {...register("settings.grid")}
            className="max-w-5 max-h-5 m-auto w-min"
            type="radio"
            id="staticGrid"
            value="static"
            name="settings.grid"
          ></input>
        </label>

        <label className="cursor-pointer flex flex-col justify-center items-center grow shrink basis-0">
          <div className="scale-y-[1.12] rotate-90 mt-[-2px] ml-[-0.5rem]">
            <i className="ri-layout-masonry-fill text-5xl text-gray-400"></i>
          </div>

          <p>Dynamic grid</p>
          <p className="text-xs w-[60%] text-center text-textPrimary text-opacity-80">
            (Thumbnails will adapt to image orientation, which might shuffle
            gallery order)
          </p>
          <input
            {...register("settings.grid")}
            className="max-w-5 max-h-5 m-auto w-min"
            type="radio"
            id="dynamiGrid"
            value="dynamic"
            name="settings.grid"
          ></input>
        </label>
      </fieldset>
    </section>
  );
}
