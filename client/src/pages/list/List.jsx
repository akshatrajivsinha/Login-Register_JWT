import axios from "axios";
import React, { useEffect, useState } from "react";
import Lists from "../../components/list/List";
import "./list.css"

const List = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [id, setid] = useState("");
  const [data, setdata] = useState([]);


  const refreshToken = async () => {
    try {
      const res = await axios.post("/employee/refresh", { token: currentUser.refreshtoken });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchpost = async () => {
      const res = await axios.get("/employee",{ headers: { authorization: currentUser.token } });
      setdata(res.data);
    };
    fetchpost();
  }, []);

  const handlefilter = async (e) => {
    e.preventDefault();
    
      try {
        const result = await axios.get(`/employee/filter?name=${name}&email=${email}&id=${id}`);
        setdata(result.data);
      } catch (err) {
        console.log("error");
      }
  };

  const handlereset = async (e) => {
    e.preventDefault();
    
      try {
        const res = await axios.get("/employee",{ headers: { authorization: currentUser.token } });
      setdata(res.data);
      } catch (err) {
        console.log("error");
      }
  };

  return (
    <div className="lists">
      <div className="topcontent">
        <div className="h1">
          <h1>Filter</h1>
        </div>
        <div className="form">
          <form action="" onSubmit={handlefilter}>
            <div className="input">
              <label className="lable">Name</label>
              <input
                className="input1"
                type="text"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="lable">Email</label>
              <input
                className="input1"
                type="text"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="input">
              <label className="lable">ID</label>
              <input
                className="input1"
                type="text"
                onChange={(e) => setid(e.target.value)}
              />
            </div>

            <button className="button">Do Filter</button>
            <button className="button" onClick={handlereset}>Reset</button>
          </form>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="th" scope="col">_id</th>
            <th className="th" scope="col">Image</th>
            <th className="th" scope="col">Name</th>
            <th className="th" scope="col">Email</th>
            <th className="th" scope="col">Mobile No</th>
            <th className="th" scope="col">Designation</th>
            <th className="th" scope="col">Gender</th>
            <th className="th" scope="col">Create Date</th>
            <th className="th" scope="col">Update</th>
            <th className="th" scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          <Lists data={data} />
        </tbody>
      </table>
    </div>
  );
};

export default List;
