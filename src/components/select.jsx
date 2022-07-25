import React from "react";

export default function Select(props) {
    return (
        <select
            className={`px-5 md:px-10 font-bold bg-gray-500 border-transparent ${props?.classStatus ?? ""} max-w-lg w-full`}
            onChange={props?.onChange} name={props?.name??""}
        >
            <option disabled selected>Jenis Kelamin</option>
            { props?.lists?.map((el, i)=>{
                return <option key={i} value={el}>{el}</option>
            }) }
        </select>
    )
}