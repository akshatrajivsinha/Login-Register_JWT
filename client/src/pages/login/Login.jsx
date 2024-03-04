import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setuser] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      const res = await axios.post("/auth/login",{
        username,
        password,
        email
      })
      navigate("/list")
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      alert("You have successfully Login.")
      alert(`Your JWT token is:  "${res.data.token}"`)
  
    }catch(err){
      console.log("erroe")
    }
   }

  return (
    <div className="login">
      <div className="container">
        <h1 className="h1">Login</h1>
          <form action="" className="form" onSubmit={handleLogin}>
            <label className="label">UserName</label>
            <input
              className="input"
              type="text"
              placeholder="Enter you username"
              onChange={(e) => setuser(e.target.value)}
            />
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
            />
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <button className="button">Login Me</button>
          </form>
        

      </div>
    </div>
  );
};

export default Login;
