import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { useParams } from 'react-router-dom'
import { useAddDataContext } from '../../Components/Context/Context'
import axios from 'axios'
import moment from "moment"

export default function Profile() {
  const[singleUserProfile,setSingleUserProfile]=useState({})
  const{url}=useAddDataContext()
  const{id}=useParams();
  const userProfileGet=async()=>
  {

try{
  const response=await axios.get(`${url}/user/${id}`);
  console.log(response)
  if(response.data.success===true)
  {
    setSingleUserProfile(response.data.userData)
  }
}catch(error)
{
  console.log(error)
}
  }
  useEffect(()=>
  {
userProfileGet()
  },[id])
  console.log(singleUserProfile)
  return (
   <section>
    <div className='profile-card container grid grid-two-rows'>
    
    <div className='common-image'>
        <img src={`${url}/uploads/${singleUserProfile.profile}`}/>
        </div>
        <div className="profile-user-details">
            <h3>{singleUserProfile.fname+singleUserProfile.lname}</h3>
                <h4><i className="fa-solid fa-envelope email"></i>&nbsp;:- <span>{singleUserProfile.email}</span> </h4>
                <h5><i className="fa-solid fa-mobile"></i>&nbsp;:- <span>{singleUserProfile.mobile}</span> </h5>
                <h4><i className="fa-solid fa-person"></i>&nbsp;:- <span>{singleUserProfile.gender}</span> </h4>
                <h4><i className="fa-solid fa-location-pin location"></i>&nbsp;:- <span>{singleUserProfile.location}</span> </h4>
                <h4>Status&nbsp;:- <span>Male</span> </h4>
                <h5><i className="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Created&nbsp;:- <span>{moment(singleUserProfile.dateCreated).format("DD-MM-YY")}</span> </h5>
                <h5> <i className="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Updated&nbsp;:- <span>01-07-2024</span> </h5>
        </div>
    </div>
   </section>
  )
}
