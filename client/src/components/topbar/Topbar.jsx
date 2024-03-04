import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./topbar.css";
import axios from "axios";

function Topbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [active, setActive] = useState(false);
  const Navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      Navigate("/login");
    } catch (err) {
      console.log("error in logout");
    }
  };

  return (
    <div className={active ? "topbar scroll" : "topbar"}>
      <div className="container">
        <div className="left">
                  <img className="img" src="https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg"/>

        {!currentUser && <Link className="righth3 Link" to={"/"}>
                  <h1 className="lefth1">Employee</h1>
                  </Link>}
            {currentUser &&    <>
                  <Link className="righth3 Link" to={"/list"}>
                  <h1 className="lefth1">Employee</h1>
                  </Link></>}

        </div>
        <div className="right">
          {!currentUser && (
            <>
              <Link className="righth3 Link" to={"/login"}>
                Login
              </Link>
              <Link className="righth3 Link" to={"/"}>
                Register
              </Link>
            </>
          )}

          {currentUser && (
            <>
              
              
                  
                  <Link className="righth3 Link" to={"/create"} >
                    CreateEmployee
                  </Link>
                  <Link className="righth3 Link" >
                    {currentUser.username}
                  </Link>
              
              
              <Link className="righth3 Link" onClick={handleLogout}>
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
