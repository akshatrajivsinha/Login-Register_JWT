import React, { useState } from "react";
import "./Create.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  
      const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [file, setFile] = useState(null);

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
      console.log(newPost)
      const data = await axios.post("/employee/create", newPost)
      navigate("/list")
    } catch (err) { console.log(err) }
  };



  return (
    <div className="create">
      <div className="container">
        <h1 className="h1">Create Employee</h1>

        <form action="" className="form" onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            placeholder="Enter employee name"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="Enter employee email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label">Mobile No.</label>
          <input
            className="input"
            type="number"
            placeholder="Enter employee mobile Number"
            onChange={(e) => setMobile(e.target.value)}
          />
          <label className="label">Designation</label>
          <select
            class="input form-select form-select-sm"
            aria-label="Small select example"
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option selected>Open this select menu</option>
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
          {file && (
            
            <img
            className="writeImg"
            src={URL.createObjectURL(file)}
            alt=""
            />
            )}
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />

          <button className="button">Create Employee</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
