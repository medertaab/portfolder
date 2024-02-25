import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SettingsNavigation from "./settingsNavigation";
import useUpdateData from "../../hooks/useUpdateData";
import { useForm } from "react-hook-form";
import DisplayForm from "./pageForms/DisplayForm";
import SocialsForm from "./pageForms/SocialsForm";
import DescriptionForm from "./pageForms/DescriptionForm";
import ThemeForm from "./pageForms/ThemeForm";
import LoaderAnimation from "../ui/LoaderAnimation";

export default function ManagePage(props) {
  const { portfolioData } = props;
  const { updateData, updateLoading, didUpload } = useUpdateData();
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

  const searchParams = useSearchParams();
  const router = useRouter();

  if (!searchParams.has("type")) {
    router.replace(
      {
        query: { type: "display" },
      },
      undefined
    );
  }

  useEffect(() => {
    reset(portfolioData);
  }, []);


  function onSubmit(e) {
    e.preventDefault();
    if (isDirty) {
      handleSubmit(updateData)();
    } else {
      return;
    }
  }

  const settingsComponents = {
    display: (
      <DisplayForm
        title="display"
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />
    ),
    description: (
      <DescriptionForm
        title="description"
        register={register}
        watch={watch}
        setValue={setValue}
      />
    ),
    theme: (
      <ThemeForm
        title="theme"
        register={register}
        watch={watch}
        setValue={setValue}
      />
    ),

    socials: (
      <SocialsForm
        title="socials"
        register={register}
        unregister={unregister}
        watch={watch}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />
    ),
  };

  return (
    <main >
      <SettingsNavigation />

      <form className="settings-form relative flex flex-col sm:p-10 p-3 max-w-[900px] m-auto">
        {settingsComponents[searchParams.get("type")]}

        <button
          onClick={onSubmit}
          type="submit"
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
    </main>
  );
}
