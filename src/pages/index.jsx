import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserCtx from "../context/user.ctx";

export default function Home(props) {
    const { isLogin } = useContext(UserCtx);
    if (!isLogin) {
        return (
            <Navigate to="/login" replace={true} />
        )
    }
    return (
        <>
            <article className="prose">
                <h1>Selamat Datang</h1>
                <h2>Maaf Aplikasi Masih Dalam Tahap Pengembangan.</h2>
            </article>
        </>
    )
}