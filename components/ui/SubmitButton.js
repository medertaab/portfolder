import React from 'react'
import LoaderAnimation from './LoaderAnimation';

export default function SubmitButton(props) {
  if (props.disabled) {
    return (
      <button
        className="w-full h-10 border-[1px] border-textPrimary duration-300 relative rounded-lg opacity-50"
        disabled
      >
        {props.text}
      </button>
    );
  } else
    return (
      <button
        onClick={props.onClick}
        type="submit"
        className="w-full h-10 border-[1px] border-bgAccent duration-300 relative rounded-lg bg-bgAccent text-primaryLight hover:opacity-80"
      >
        {props.loading ? <LoaderAnimation small={true} /> : props.text}
      </button>
    );
}