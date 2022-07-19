import { Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
import UserCtx from "./context/user.ctx";
import './App.css';
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const userMemo = useMemo(()=>({isLogin, setIsLogin}), [isLogin]);
  return (
    <UserCtx.Provider value={userMemo}>
      <header>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </main>
      <footer></footer>
    </UserCtx.Provider>
  );
}

export default App;
