import React, { useState, useEffect } from "react";
import DisplayForm from "./DisplayForm";
import SocialsForm from "./SocialsForm";
import DescriptionForm from "./DescriptionForm";
import ThemeForm from "./ThemeForm";
import LoaderAnimation from "../../LoaderAnimation";
import useUpdateData from "../../../hooks/useUpdateData";
import { useForm } from "react-hook-form";

export default function PageSettings(props) {
  const { portfolioData, setPortfolioData, error } = props;
  const [currentForm, setCurrentForm] = useState("display");
  const { updateData, updateLoading, updateError, didUpload } = useUpdateData();
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isDirty },
    setValue,
  } = useForm();

  useEffect(() => {
    setCurrentForm("display");
    reset(portfolioData);
  }, []);

  // For button slider CSS translate value
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    const titles = ["display", "socials", "description", "theme"];
    setCurrentId(titles.indexOf(currentForm));
  }, [currentForm]);

  function onSubmit(data) {
    if (isDirty) {
      updateData(data);
    } else {
      return;
    }
  }

  if (!portfolioData) {
    return <LoaderAnimation />;
  } else
    return (
      <div>
        <div className="relative flex max-w-[80%] m-auto text-base sm:text-lg font-semibold ">
          <button
            onClick={() => setCurrentForm("display")}
            className="p-2 hover:text-bgAccent duration-150 w-1/4"
          >
            Display info
          </button>
          <button
            onClick={() => setCurrentForm("socials")}
            className="p-2 hover:text-bgAccent duration-150 w-1/4"
          >
            Socials
          </button>
          <button
            onClick={() => setCurrentForm("description")}
            className="p-2 hover:text-bgAccent duration-150 w-1/4"
          >
            Bio
          </button>
          <button
            onClick={() => setCurrentForm("theme")}
            className="p-2 hover:text-bgAccent duration-150 w-1/4"
          >
            Theme
          </button>
          <div
            className={`w-[25%] absolute bg-bgAccent bottom-0 h-1 duration-150 translate-x-[${currentId*100}%]`}
          ></div>
        </div>

        <form className="settings-form relative flex flex-col sm:p-10 p-3">
          {currentForm === "display" && (
            <DisplayForm
              title="display"
              register={register}
              watch={watch}
              errors={errors}
              setValue={setValue}
            />
          )}
          {currentForm === "socials" && (
            <SocialsForm
              title="socials"
              register={register}
              unregister={unregister}
              watch={watch}
              setValue={setValue}
              getValues={getValues}
              errors={errors}
            />
          )}
          {currentForm === "description" && (
            <DescriptionForm
              title="description"
              register={register}
              watch={watch}
              setValue={setValue}
            />
          )}
          {currentForm === "theme" && (
            <ThemeForm
              title="theme"
              register={register}
              watch={watch}
              setValue={setValue}
            />
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            type="button"
            className="float-right ml-auto mt-5 border-2 border-bgAccent w-24 h-10 rounded text-lg hover:bg-bgAccent duration-150"
          >
            {updateLoading ? (
              <LoaderAnimation small={true} />
            ) : didUpload ? (
              <i className="text-lime-600 fa-solid fa-check"></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    );
}
