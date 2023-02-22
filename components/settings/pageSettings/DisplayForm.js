import React, { useEffect, useState } from "react";
import useCheckImage from "../../../hooks/useCheckImage";
import LoaderAnimation from "../../LoaderAnimation";
import { sanitizeUrl } from "../../../hooks/useSanitizeUrl";

export default function DisplayForm(props) {
  const { register, watch, errors } = props;
  const {
    checkImage,
    isValid,
    isValidLoading,
    setIsValidLoading,
    isValidError,
    isEmpty,
  } = useCheckImage();

  useEffect(() => {
    checkImage(watch("mainData.icon"))
  }, [])

  function handleIconChange(e) {
    setIsValidLoading(true);
    setTimeout(() => {
      checkImage(watch("mainData.icon"));
    }, 700);
  }

  return (
    <section className="[&_input]:px-2 [&_input]:h-10 [&_input]:bg-bgSecondary [&_input]:w-full [&_input]:border-[1px] [&_input]:rounded [&_input]:border-gray-400 [&_input]:mt-1 [&_input:focus]:outline-none">
      <label for="nameInput">Display name</label>
      <span
        className={`float-right w-14 text-center ${
          errors.mainData?.name && "text-red-500"
        }`}
      >
        {watch("mainData.name") ? watch("mainData.name").length : 0}/50
      </span>
      <span className="text-red-500 ml-2 text-sm align-middle">
        {errors.mainData?.name?.message}
      </span>
      <input
        id="nameInput"
        type="text"
        {...register("mainData.name", {
          maxLength: { value: 50, message: "(Display name is too long)" },
        })}
      />

      <div className="divider"></div>

      <label for="iconInput">Profile picture URL</label>
      <input
        id="iconInput"
        type="URL"
        {...register("mainData.icon", {
          validate: () => isValid,
          onChange: (e) => handleIconChange(e),
        })}
      />

      {/* Profile picture preview */}
      <div>
        {isEmpty && !isValidLoading && (
          <div className="my-10 border-2 rounded border-dashed border-textPrimary border-opacity-70 m-auto h-56 w-[10rem] flex items-center text-center">
            <p className="m-auto">No profile picture</p>
          </div>
        )}
        {isValid && !isValidLoading && !isEmpty && (
          <img
            src={watch("mainData.icon")}
            alt="user icon"
            className="h-56 mx-auto my-10"
          />
        )}
        {isValidLoading && (
          <div className="my-10 border-2 rounded border-dashed border-textPrimary m-auto h-56 w-[10rem] flex items-center">
            {<LoaderAnimation />}
          </div>
        )}
        {!isValidLoading && !isValid && !isEmpty && (
          <div className="my-10 border-2 rounded border-dashed border-red-400 m-auto h-56 w-[10rem] flex items-center">
            <p className="text-center p-5">Could not get image :( </p>
          </div>
        )}
      </div>

      <div className="divider"></div>

      <label for="titleInput">Occupation or field</label>
      <span
        className={`float-right w-14 text-center ${
          errors.mainData?.title && "text-red-500"
        }`}
      >
        {watch("mainData.title") ? watch("mainData.title").length : 0}/50
      </span>
      <span className="text-red-500 ml-2 text-sm align-middle">
        {errors.mainData?.title?.message}
      </span>
      <input
        id="titleInput"
        className={`border-2 border-red-500`}
        type="text"
        {...register("mainData.title", {
          maxLength: { value: 50, message: "(Occupation is too long)" },
        })}
      />

      <div className="divider"></div>

      <label for="emailInput">Contact email</label>
      <span className="text-red-500 ml-2 text-sm align-middle">
        {errors.mainData?.email?.message}
      </span>
      <input
        id="emailInput"
        type="email"
        {...register("mainData.email", {
          maxLength: {value: 200, message: "(Please enter a valid email address)"},
          minLength: {value: 5, message: "(Please enter a valid email address)"},
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "(Please enter a valid email address)"
          },
          required: false
        })}
      />

      <div className="divider"></div>

      <label for="resumeInput">Link to resume file</label>
      <span className="text-red-500 ml-2 text-sm align-middle">
        {errors.mainData?.resume?.message}
      </span>

      <input id="resumeInput" type="URL" {...register("mainData.resume", {
        pattern: {
          value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
          message: "(Please enter a valid URL that starts with HTTP/HTTPS)"
        },
        validate: {
          sanitize: (url) => (sanitizeUrl(url) !== "about:blank")
        }
      })} />
    </section>
  );
}
