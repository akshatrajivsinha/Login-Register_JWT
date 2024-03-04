import React, { useEffect, useState } from "react";
import "./update.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const location = useLocation();
  const [detail, setdetail] = useState("");
  const path = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [gender, setGender] = useState(detail.gender);
  const [name, setName] = useState(detail.name);
  const [email, setEmail] = useState(detail.email);
  const [mobile, setMobile] = useState(detail.mobile);
  const [designation, setDesignation] = useState(detail.designation);
  const [file, setFile] = useState(null);
  console.log(path)
  
  useEffect(() => {
    const fetchdetail = async () => {
      const res = await axios.get("/employee/" + path,{ headers: { authorization: currentUser.token } })
      setdetail(res.data)
      
    }
    fetchdetail()
  }, [])
  console.log(detail)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      name,
      email,
      mobile,
      gender,
      designation
    }
    
    
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename)
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }
    
    try {
      const data = await axios.put(`/employee/${path}`, newPost)
      navigate("/list")
    } catch (err) { console.log(err) }
  };

  return (
    <div className="update">
      <div className="container">
        <h1 className="h1">Update Employee</h1>

        <form action="" className="form" onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            // value={detail.name}
            onChange={(e) => setName(e.target.value)}
            placeholder={detail.name}
          />
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            // value={detail.email}
            placeholder={detail.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label">Mobile No.</label>
          <input
            className="input"
            type="number"
            // value={detail.mobile}
            placeholder={detail.mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <label className="label">Designation</label>
          <select
            class="input form-select form-select-sm"
            aria-label="Small select example"
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option selected>{detail.designation}</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>

          <label className="label ">Gender</label>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onChange={() => setGender("male")}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Male
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              onChange={() => setGender("female")}
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Female
            </label>
          </div>

          <label className="label ">Upload File</label>
          {file ? (
            
            <img
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt=""
            />
            ):
          <img
          className="writeImg"
          src={`http://localhost:5000/images/${detail.photo}`}
          alt=""
          />
        }
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />

          <button className="button">Update Employee</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
