import React, {useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import Form from "../components/form_log/form";
import Input from "../components/input";
import { Link } from "react-router-dom";
import Select from "../components/select";

export default function Register(props) {
    const [nama, setNama] = useState("");
    const [namaValid, setNamaValid] = useState(null);
    const [npm, setNpm] = useState("");
    const [npmValid, setNpmValid] = useState(null);
    const [jenkel, setJenkel] = useState(null);
    const [major, setMajor] = useState("");
    const [majorValid, setMajorValid] = useState(null);
    const [semester, setSemester] = useState(1);
    // untuk computasi tipe dan icon password
    const [vision, setVision] = useState(false);
    // ------------------------------------------
    return (
        <div className="m-3 p-5">
            <Form>
                <div className="prose">
                    <h2 className="py-2 text-gray-900">REGISTER</h2>
                </div>
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(namaValid)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("user-large")} />
                        </span>
                        <Input type="text"
                            placeholder="Nama Lengkap"
                            value={nama}
                            classStatus={decideStatusClass(namaValid)}
                            onChange={(e) => {
                                setNamaValid(validasiNama(e.target.value));
                                setNama(e.target.value);
                            }} />
                    </label>
                </div>
                {/* ------------------- NPM */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(npmValid)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("user-shield")} />
                        </span>
                        <Input type={vision?"text":"password"}
                            placeholder="Nomor Induk Mahasiswa"
                            value={npm}
                            classStatus={decideStatusClass(npmValid)}
                            onChange={(e) => {
                                setNpmValid(validasiNpm(e.target.value));
                                setNpm(e.target.value);
                            }} />
                        <button className="btn btn-square" onClick={()=>{ setVision(!vision) }}>
                            <FontAwesomeIcon icon={vision?solid("eye-slash"):solid("eye")} className="m-3" />
                        </button>
                    </label>
                </div>
                {/* ---------------- JENKEL */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass((jenkel && jenkel.length>0))} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("venus-mars")} />
                        </span>
                        <Select classStatus={decideStatusClass(jenkel && jenkel.length>0)}
                            lists={["L", "P"]} defaultValue="Jenis Kelamin"
                            onChange={(e)=>{ setJenkel(e.target.value); }} />
                    </label>
                </div>
                {/* ----------------------- MAJOR */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(majorValid)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("hotel")} />
                        </span>
                        <Input type="text"
                            placeholder="Jurusan / Fakultas"
                            value={major}
                            classStatus={decideStatusClass(majorValid)}
                            onChange={(e) => {
                                setMajorValid(validasiMajor(e.target.value));
                                setMajor(e.target.value);
                            }} />
                    </label>
                </div>
                {/* ----------------------- SEMESTER */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(semester<15 && semester>0)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("list-check")} />
                        </span>
                        <Input type="number"
                            min="1" max="14"
                            value={semester}
                            placeholder="Semester"
                            classStatus={decideStatusClass((semester<15 && semester>0))}
                            onChange={(e) => {
                                setSemester(Number(e.target.value));
                            }} />
                    </label>
                </div>
                <button
                    className="text-sm text-white sm:text-md bg-teal-400 hover:bg-teal-500 active:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-200 mt-3 py-3 px-6 rounded font-bold">
                    <FontAwesomeIcon className="mr-3" icon={solid("right-to-bracket")} />
                    REGISTER
                </button>
                <div className="w-full pt-3 pb-1 text-center text-sm text-blue-700 font-bold">
                    <span className="text-gray-800 mr-2 text-xs text-semi-bold">Sudah punya akun ?</span>
                    <Link to="/login">Login</Link>
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
    return /^([0-9]{4})([0-9]{3})([0-9]{3})$/gi.test(npm);
}
function validasiMajor(major){
    if( major.length<1 ){ return null; }
    return !/[^a-zA-Z\s]/gi.test(major);
}