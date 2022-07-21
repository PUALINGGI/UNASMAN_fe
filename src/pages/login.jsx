import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import UserCtx from "../context/user.ctx";

import Form from "../components/form_log/form";
import Input from "../components/input";
import { Link } from "react-router-dom";

export default function Login(props) {
    const { setIsLogin } = useContext(UserCtx);
    const [nama, setNama] = useState("");
    const [namaValid, setNamaValid] = useState(null);
    const [npm, setNpm] = useState("");
    const [npmValid, setNpmValid] = useState(null);
    return (
        <div className="m-3 p-5">
            <Form>
                <div className="prose">
                    <h2 className="py-2 text-gray-900">LOGIN</h2>
                </div>
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="input-group input-group-vertical rounded w-full max-w-full lg:max-w-lg">
                        <span className={`py-3 font-semi-bold text-xs sm:text-sm ${decideSpanClass(namaValid)} `}>
                            <FontAwesomeIcon className="mr-3" icon={solid("user")} />
                            Nama Lengkap :
                        </span>
                        <Input type="text"
                            value={nama}
                            classStatus={decideStatusClass(namaValid)}
                            onChange={(e) => {
                                setNamaValid(validasiNama(e.target.value));
                                setNama(e.target.value);
                            }} />
                    </label>
                </div>
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="input-group input-group-vertical w-full max-w-full lg:max-w-lg">
                        <span className={`py-3 font-semi-bold text-xs sm:text-sm ${decideSpanClass(npmValid)} `}>
                            <FontAwesomeIcon className="mr-3" icon={solid("user-shield")} />
                            Nomor Pokok Mahasiswa :
                        </span>
                        <Input type="text"
                            value={npm}
                            classStatus={decideStatusClass(npmValid)}
                            onChange={(e) => {
                                setNpmValid(validasiNpm(e.target.value));
                                setNpm(e.target.value);
                            }} />
                    </label>
                </div>
                <button
                    className="text-sm text-white sm:text-md bg-teal-400 hover:bg-teal-500 active:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-200 mt-3 py-3 px-6 rounded font-bold">
                    <FontAwesomeIcon className="mr-3" icon={solid("right-to-bracket")} />
                    LOGIN
                </button>
                <div className="w-full pt-3 pb-1 text-center text-sm text-blue-700 font-bold">
                    <span className="text-gray-800 mr-2 text-xs text-semi-bold">Belum memiliki Akun ?</span>
                    <Link to="/register">Register</Link>
                </div>
            </Form>
        </div>
    )
}

function decideStatusClass(condition) {
    if (condition === null | condition === undefined) { return "text-white" }
    return condition ? "text-success" : "text-error";
}

function decideSpanClass(condition) {
    if (condition === null | condition === undefined) { return "bg-info text-white" }
    return condition ? "bg-success text-black" : "bg-error text-black";
}

function validasiNama(nama) {
    if (nama.length < 1) { return null; }
    return /^(\b[a-zA-Z])([a-zA-Z]{0,})\s?([a-zA-Z]{1,})*$/gi.test(nama);
}
function validasiNpm(npm) {
    if (npm.length < 1) { return null; }
    return /^([0-9]{10,})$/gi.test(npm);
}