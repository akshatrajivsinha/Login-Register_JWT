import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./list.css"

export default function List({data}) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        try {
          await axios.delete("/employee/"+e,{ headers: { authorization: currentUser.token } });
          window.location.reload(true);
        } catch (err) {
          console.log("error in deleting");
        }
      };

      const handelupdate = async (e) => {
        navigate("/update/"+e);
      }
  return (
    <>{data.map((curdata)=>{
        const { name, email, mobile, designation, gender,createdDate } = curdata;
return(
      <tr className='tr'>
            <th className='td' scope="row">{curdata._id}</th>
            <td className='td'><img className="img" src={`http://localhost:5000/images/${curdata.photo}`} alt="" /></td>
            <td className='td'>{name}</td>
            <td className='td'>{email}</td>
            <td className='td'>{mobile}</td>
            <td className='td'>{designation}</td>
            <td className='td'>{gender}</td>
            <td className='td'>{new Date(createdDate).toDateString()}</td>
            <td className='td'><button className='button' onClick={()=>handelupdate(curdata._id)}>Update</button></td>
            <td className='td'><button className='button' onClick={()=>{handleDelete(curdata._id)}}>Delete</button></td>
          </tr>)
    })}
         
    </>
  )
}
