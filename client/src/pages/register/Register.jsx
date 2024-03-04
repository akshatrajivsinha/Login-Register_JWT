import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setuser] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [check , setcheck] = useState(false);

  const handleRegistration = async(e)=>{
    e.preventDefault();
    
    if(check) {
      try {await axios.post("/auth/register",{username,email,password})
      alert("successfully registered")
      navigate("/login");
      alert(`Thank you for signing up! Welcome email sent to "${email}"`)
    }
    catch(err){
      console.log("error")}

    }else{
      alert("please check the checkbox")
    }
  }

  return (
    <div className="register">
      <div className="container">
        <h1 className="h1">Register</h1>
        
          <form action="" className="form" onSubmit={handleRegistration}>
          
            <label className="label">UserName</label>
            <input
              className="input"
              type="text"
              placeholder="Enter username without space"
              onChange={(e) => setuser(e.target.value)}
              />
            <span className="warning">No space in Username</span>
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

          <div style={{diaplay:"flex"}}>
              <input
              class=""
              type="checkbox"
              value="Terms & condition"
              onChange={()=> setcheck(!check)}
              />
            <label class="label" style={{fontSize:"17px"}}>
            Terms & condition
            </label>
              </div> 

            <button className="button" >
              Register Me
            </button>
          </form>
        
        
      </div>
    </div>
  );
};

export default Register;
