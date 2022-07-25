import React from "react";

export default function Input(props) {
    return (
        <input type={props.type??"text"} required={props.required??false}
            placeholder={props.placeholder??""}
            min={props?.min??""} max={props?.max??""}
            value={props?.value??""} name={props?.name??""}
            className={`input font-bold bg-gray-500 px-5 md:px-10 border-transparent ${true&&props.classStatus} w-full max-w-full lg:max-w-lg`}
            onChange={true&&props.onChange}
        />
    )
}