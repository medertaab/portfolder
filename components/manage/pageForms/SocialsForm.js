import React from "react";

export default function SocialsForm(props) {
  const { register, unregister, setValue, watch, getValues, errors } = props;

  const socialSites = [
    "twitter",
    "instagram",
    "facebook",
    "youtube",
    "linkedin",
    "patreon"
  ];

  function removeLink(i) {
    unregister(`socials.custom[${i}].name`, { keepDirty: true })
    unregister(`socials.custom[${i}].link`, { keepDirty: true })
  }

  function customLink(link, i) {
    return (
      <div>
        <label for={`custom${i}-title`}>Custom link {i+1}</label>
        <button 
          className="float-right mr-2 text-textPrimary text-opacity-60 hover:text-opacity-100 duration-150"
          type="button"
          onClick={() => removeLink(i)}
        >
          Remove link
          <i className="fa-solid fa-xmark align-middle ml-2 mb-[2px]"></i>
        </button>
        <div className="flex items-center bg-bgSecondary px-2 border-[1px] w-full rounded h-10 border-gray-400 my-1">
          <label for={`custom${i}-title`} className="flex items-center">
            <i className="ri-file-text-fill pr-1 text-gray-500"></i>
          </label>
          <input
            id={`custom${i}-title`}
            placeholder="Page title"
            type="text"
            {...register(`socials.custom[${i}].name`)}
            className="focus:outline-none h-full grow"
          ></input>
        </div>
        <div className="flex items-center bg-bgSecondary px-2 border-[1px] w-full rounded h-10 border-gray-400 my-1">
          <label for={`custom${i}-link`} className="flex items-center">
            <i className="ri-links-line pr-1 text-gray-500"></i>
          </label>
          <input
            id={`custom${i}-link`}
            placeholder="Custom URL"
            type="text"
            {...register(`socials.custom[${i}].sitelink`)}
            className="focus:outline-none h-full grow"
          ></input>
        </div>
        <div className="divider"></div>
      </div>
    );
  }

  function addCustomLink() {
    if (!getValues("socials.custom") || !getValues("socials.custom").length){
      setValue(`socials.custom`, [{name: "", sitelink: ""}])
    } else if (getValues("socials.custom").length === 3) {
      return
    } else {
      setValue(`socials.custom`, [...getValues("socials.custom"), {name: "", sitelink: ""}])
    }
  }

  return (
    <section>
      {socialSites.map((site) => {
        return (
          <>
            {errors.socials?.[site]?.message && (
              <span className="text-red-500 text-sm">
                {errors.socials[site].message}
              </span>
            )}
            <div className="w-full flex h-10 bg-bgSecondary rounded border-[1px] border-gray-400 items-center pl-2">
              <label
                for={site}
                className="w-fit h-full flex items-center pr-0.5 text-gray-500"
              >
                <i className={`fa-brands fa-${site} pr-2`}></i>
                {site}.com/{site === "linkedin" && "in/"}
              </label>

              <input
                id={site}
                className="bg-bgSecondary grow focus:outline-none"
                type="text"
                {...register(`socials.${site}`, {
                  pattern: {
                    value: /^[A-Za-z0-9_.-]+$/,
                    message: `(Please enter a valid ${site} handle)`,
                  },
                })}
              />
            </div>
            <div className="divider"></div>
          </>
        );
      })}

      {watch("socials.custom")?.map((link, i) => {
        return customLink(link, i)
      })}

      {/* <button
        type="button"
        className={`flex items-center border-2 border-bgAccent rounded p-2 pr-4 duration-150 ${watch("socials.custom")?.length === 3 ? "opacity-50 cursor-default hover:none" : "opacity-100 cursor-pointer hover:bg-bgAccent"}`}
        onClick={addCustomLink}
      >
        <i class="ri-add-line mr-1"></i>Add custom link
      </button> */}
    </section>
  );
}
