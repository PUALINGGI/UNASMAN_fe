import React, { useState, useRef, createRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import noImage from "../assets/noImage.png"

import Form from "../components/form_log/form";
import Input from "../components/input";
import { Link } from "react-router-dom";
import Select from "../components/select";
import Spinner from "../components/spinner";
import MyModal from "../components/modal";

export default function Register(props) {
    const [nama, setNama] = useState("");
    const [namaValid, setNamaValid] = useState(null);
    const [npm, setNpm] = useState("");
    const [npmValid, setNpmValid] = useState(null);
    const [jenkel, setJenkel] = useState(null);
    const [major, setMajor] = useState("");
    const [majorValid, setMajorValid] = useState(null);
    const [semester, setSemester] = useState(null);
    const [smsValid, setSmsValid] = useState(null);
    const [mail, setMail] = useState(null);
    const [mailValid, setMailValid] = useState(null);
    const [hp, setHp] = useState(null);
    const [hpValid, setHpValid] = useState(null);
    const [foto, setFoto] = useState(null);
    // untuk computasi tipe dan icon password
    const [vision, setVision] = useState(false);
    // ------------------------------------------
    const imageTarget = useRef(null);
    const modalTarget = createRef(null);
    //
    const [isFetching, setIsFetching] = useState(null);
    const [regStatus, setRegStatus] = useState(false);
    const [show, setIsShow] = useState(false);
    const [message, setMessage] = useState("");

    if (isFetching) {
        return <Spinner />
    }

    return (
        <form className="m-3 p-5"
            onSubmit={ ((e)=>{
                handleForm(
                    e, [namaValid, npmValid, jenkel&&true, majorValid, smsValid, mailValid, hpValid, foto&&true].every(n=>{return n===true}),
                    setIsFetching, setRegStatus, setMessage
                );
            }) }
        >
            <MyModal
                ref={modalTarget} show={show}
                header={regStatus?"Sukses":"Gagal"}
                message={message} />
            <Form>
                <div className="prose">
                    <h2 className="py-2 text-gray-900">REGISTER</h2>
                </div>
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama Lengkap :</label>
                    <label className="input-group">
                        <span className={`justify-center items-center font-semi-bold text-xs sm:text-sm ${decideSpanClass(namaValid)} `}>
                            <FontAwesomeIcon className="m-auto sm:m-3" icon={solid("user-large")} />
                        </span>
                        <Input type="text" required
                            placeholder="Nama Lengkap"
                            value={nama} name="nama"
                            classStatus={decideStatusClass(namaValid)}
                            onChange={(e) => {
                                setNamaValid(validasiNama(e.target.value));
                                setNama(e.target.value);
                            }} />
                    </label>
                </div>
                {/* ------------------- NPM */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">NPM :</label>
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(npmValid)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("user-shield")} />
                        </span>
                        <Input type={vision ? "text" : "password"}
                            placeholder="Nomor Induk Mahasiswa"
                            value={npm} name="npm" required
                            classStatus={decideStatusClass(npmValid)}
                            onChange={(e) => {
                                setNpmValid(validasiNpm(e.target.value));
                                setNpm(e.target.value);
                            }} />
                        <button className="btn btn-square" onClick={() => { setVision(!vision) }}>
                            <FontAwesomeIcon icon={vision ? solid("eye-slash") : solid("eye")} className="m-3" />
                        </button>
                    </label>
                </div>
                {/* ---------------- JENKEL */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jenis Kelamin :</label>
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass((jenkel && jenkel.length > 0))} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("venus-mars")} />
                        </span>
                        <Select classStatus={decideStatusClass(jenkel && jenkel.length > 0)}
                            lists={["L", "P"]} defaultValue="Jenis Kelamin" name="jenkel"
                            onChange={(e) => { setJenkel(e.target.value); }} required />
                    </label>
                </div>
                {/* ----------------------- MAJOR */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jurusan :</label>
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(majorValid)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("hotel")} />
                        </span>
                        <Input type="text"
                            placeholder="Jurusan / Fakultas"
                            value={major} name="major"
                            classStatus={decideStatusClass(majorValid)}
                            onChange={(e) => {
                                setMajorValid(validasiMajor(e.target.value));
                                setMajor(e.target.value);
                            }} required />
                    </label>
                </div>
                {/* ----------------------- SEMESTER */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Semester :</label>
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(smsValid)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("list-check")} />
                        </span>
                        <Input type="number"
                            min="1" max="14"
                            value={semester} name="semester"
                            placeholder="Semester"
                            classStatus={decideStatusClass(smsValid)}
                            onChange={(e) => {
                                setSemester(Number(e.target.value));
                                setSmsValid(Number(e.target.value) < 15 && Number(e.target.value) > 0);
                            }} required />
                    </label>
                </div>
                {/* ----------------------- EMAIL */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-Mail :</label>
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(mailValid)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("envelope")} />
                        </span>
                        <Input type="email"
                            value={mail} name="mail"
                            placeholder="E-Mail"
                            classStatus={decideStatusClass(mailValid)}
                            onChange={(e) => {
                                setMail(e.target.value);
                                setMailValid(validasiMail(e.target.value));
                            }} required />
                    </label>
                </div>
                {/* ----------------------- HP */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nomor HP/WA :</label>
                    <label className="input-group">
                        <span className={`font-semi-bold text-xs sm:text-sm ${decideSpanClass(hpValid)} `}>
                            <FontAwesomeIcon className="m-0 sm:m-3" icon={solid("phone")} />
                        </span>
                        <Input type="text"
                            value={hp} name="hp"
                            placeholder="Hp/WhatsApp"
                            classStatus={decideStatusClass(hpValid)}
                            onChange={(e) => {
                                setHp(e.target.value);
                                setHpValid(validasiHp(e.target.value));
                            }} required />
                    </label>
                </div>
                {/* ----------------------- FOTO PROFIL */}
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <div className="flex justify-center items-center w-full">
                        <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Klik untuk Mengupload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG atau JPG</p>
                            </div>
                            <input id="dropzone-file"
                                onChange={(e) => {
                                    setFoto(e.target.files[0]);
                                    handleFile(e.target.files, imageTarget)
                                }
                                } name="foto"
                                type="file" className="hidden" />
                        </label>
                    </div>
                </div>
                <div className="form-control my-3 w-full max-w-full md:max-w-lg">
                    <div className="flex justify-center items-center w-full">
                        <img ref={imageTarget} className="rounded-t-lg" src={noImage} alt="Profil" />
                    </div>
                </div>
                <button type="submit"
                    onClick={(e)=>{
                        if( [namaValid, npmValid, jenkel&&true, majorValid, smsValid, mailValid, hpValid, foto&&true].every(n=>{return n===true}) ){
                            setIsShow(true);
                        }
                    }}
                    className="text-sm text-white sm:text-md bg-teal-400 hover:bg-teal-500 active:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-200 mt-3 py-3 px-6 rounded font-bold">
                    <FontAwesomeIcon className="mr-3" icon={solid("right-to-bracket")} />
                    REGISTER
                </button>
                <div className="w-full pt-3 pb-1 text-center text-sm text-blue-700 font-bold">
                    <span className="text-gray-800 mr-2 text-xs text-semi-bold">Sudah punya akun ?</span>
                    <Link to="/login">Login</Link>
                </div>
            </Form>
        </form>
    )
}

function handleForm(frm, condition, setIsFetching, regStatus, setMessage) {
    frm.preventDefault();
    if (condition) {
        setIsFetching(true);
        let form = new FormData(frm.target);
        fetch("http://unasmanapi.6te.net/mahasiswa/post", { method:"POST", body: form })
            .then(res => {
                res.json().then(rs => {
                    if (rs.code === 200) {
                        regStatus(true);
                        setMessage(rs.message);
                        setIsFetching(false);
                    } else {
                        regStatus(false);
                        setMessage(rs.message);
                        setIsFetching(false);
                    }
                })
            })
    }
}

function handleFile(source, target) {
    let image = source[0];
    if (!image) {
        target.current.src = noImage;
        return;
    }
    target.current.src = URL.createObjectURL(source[0]);
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
function validasiMajor(major) {
    if (major.length < 1) { return null; }
    return !/[^a-zA-Z\s]/gi.test(major);
}
function validasiMail(mail) {
    if (mail.length < 1) { return null; }
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail);
}
function validasiHp(hp) {
    if (hp.length < 1) { return null; }
    return /^(0{1})([0-9]{11})$/gi.test(hp);
}