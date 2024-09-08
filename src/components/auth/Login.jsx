/* eslint-disable */
import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import Background from "./Fuel.png";
import "./style.css"; // Import your CSS styles
import { useLoginMutation } from '../../features/user/apiUser.js'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useLoginMutation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [error, setError] = useState(""); // State untuk pesan kesalahan

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Perhatikan lagi email dan password-nya!");
      return;
    }

    const userData = {
      email,
      password,
    };

    login(userData).then((res) => {
      console.log(res.data);
      localStorage.setItem("access_token", res.data.access_token);
      navigate('/')
    }).catch((error) => {
      console.log(error);
      setError("Perhatikan lagi email dan password-nya!");
    })

  };

  return (
    <div className="containerlogin">
      <div className="imgStack">
        <img className="imglogin img1" src={Background} alt="" />
      </div>
      <div className="divLogin">
        <h2 className="h2">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label" htmlFor="email">
              <FiMail className="icon" /> Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputEmail"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              <FiLock className="icon" /> Kata Sandi:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputPass"
            />
          </div>
          <button className="button" style={{ backgroundColor: 'darkblue'}} type="submit">
            Masuk
          </button>
          <p className="error" style={{ color: 'red' }}>{error}</p>
        </form>
        <p className="p">
          Belum memiliki akun? <Link to="/register">Daftar</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;