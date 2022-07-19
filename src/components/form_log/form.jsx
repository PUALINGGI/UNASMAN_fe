import React from "react";
import  ikon from"../../assets/gbr1.jpg";
import "./form.css";
export default function Form(props) {
    return (
        <div className="card md:card-side bg-gradient-to-r from-emerald-200/[.80] to-lime-100/[.90] shadow-xl">
            <figure>
                <img className="hidden gbr-samping md:block" src={ikon} alt="Album" />
            </figure>
            <div className="card-body w-full justify-center items-center">
                { props.children }
            </div>
        </div>
    )
}