import React from 'react'
import "../Home/Home.css"
import { useAddDataContext } from './Context/Context'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"

export default function Tables({displayUserData,deleteUser,userGet,page}) {

  const{url}=useAddDataContext();
  const{id}=useParams();
  //CHANGE THE STATUS AT FRONTEND
const handleChange=async(id,status)=>
{
  console.log(id,status)
  try{
    const response=await axios.put(`${url}/user/status/${id}`,{status})
    console.log(response)
if(response.data.success===true)
  {
userGet();
toast.success("Status Updated")
  }
  }catch(error)
  {

    console.log(error)
  }

}
  
  return (
    <>
    <div className='tables-div '>
    <table className='grid grids-two-rows'>
    <thead className='thead-div '>
    <tr className="trow-div grid grid-seven-cols">
      <th>ID</th>
      <th>FullName</th>
      <th>Email</th>
      <th>Gender</th>
      <th>&nbsp;&nbsp;&nbsp;Status</th>
      <th>Profile</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody className='tbody-div'>
    {displayUserData.length>0?displayUserData.map((element,index)=>
    {

  const{fname,lname,email,gender,profile,status,_id}=element
   return( 
    <>
   <tr className='trow-div grid grid-seven-cols' key={index}>
      <td>{index+1+(page-1)*4}</td>
      <td>{fname+lname}</td>
      <td>{email}</td>

      <td>{gender==="male"?"M":"F"}</td>
      <td>
      {/* <select id="select" >
                    <option value="Active">{status == "Active" ? "primary" : "danger"}</option>
                    <option value="InActive">{status == "Active" ? "primary" : "danger"}</option>
        </select> */}

<button className={status==="Active"?"primary":"danger"} onClick={()=>handleChange(_id,"Active")}>
     
    Active
   
     </button>
     <button className={status==="Active"?"danger":"primary"} onClick={()=>handleChange(_id,"InActive")}>
     
   InActive
   
     </button>
      </td>
      <td>  <img src={`${url}/uploads/${profile}`} alt="img" /></td>
      {/* <td> <select id="select" >
      <option value="View">
      <NavLink to={`/userprofile/${_id}`}>
                    
                     
                      <i class="fa-solid fa-eye" style={{ color: "green" }}></i> View
                    
                    </NavLink>
                    </option>
                    <option value="#" disabled></option>
                    <option value="Delete">Delete</option>
                    <option value="#" disabled></option>
                    <option value="Edit">Edit</option>
        </select></td> */}
    
    <td>
      <div className='td-buttons'>
      <button>
      <NavLink to={`/userprofile/${_id}`}>
      <i className="fa-solid fa-eye" style={{ color: "green" }}></i>View
      </NavLink>
      </button>

      <button>
    <NavLink to={`/edit/${_id}`}>
      <i className="fa-solid fa-pen-to-square" style={{ color: "black" }}></i>Edit
      </NavLink>
      </button>
      <button onClick={()=>deleteUser(_id)}>
     
      <i className="fa-solid fa-trash" style={{ color: "red" }}></i>Delete
    
      </button>
      </div>
    </td>
    </tr>
    </>
   )}): <div className='no_data-div'>NO Data Found</div>}
      
  </tbody>
  </table>
  </div>
  <ToastContainer/>
  </>
  )
}
