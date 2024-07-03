
import React, { useEffect, useState } from 'react'
import "./Edit.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddDataContext } from '../../Components/Context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Components/Services/helper';

export default function Edit() {
  const[imgData,setImgData]=useState("")
  const{url,setUpdatedUserData}=useAddDataContext();
  const{id}=useParams()
  const navigate=useNavigate()
const[inputData,setInputData]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })
const setInputValue=(e)=>
{
let name=e.target.name
let value=e.target.value
setInputData({...inputData,[name]:value})
}
console.log(inputData)
const[status,setStatus]=useState("Active");
const[image,setImage]=useState("")
const[preview,setPreview]=useState("")
const setStatusValue=(e)=>
{
    console.log(e.target.value)
setStatus(e.target.value)
}
const setProfileImage=(e)=>
{
    setImage(e.target.files[0])
}

//API CaLLING
const userProfileGet=async()=>
  {

try{
  const response=await axios.get(`${url}/user/${id}`);
  console.log(response)
  if(response.data.success===true)
  {
    setInputData(response.data.userData);
    setImgData(response.data.userData.profile)
  }
}catch(error)
{
  console.log(error)
}
  }


const submitUserData = async(e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputData;

    if (fname === "") {
      toast.error("Enter first name")
    } else if (lname === "") {
      toast.error("Enter last name")
    } else if (email === "") {
      toast.error("Enter email")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is !")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Select Gender")
    } else if (status === "") {
      toast.error("Select Status")
    } else if (image === "") {
      toast.error("Select image")
    } else if (location === "") {
      toast.error("Enter Location")
    }
    else{
      const data = new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("user_profile",image||imgData)
      data.append("location",location)
   
      //UPDATE DATA ON CLICK OF SUBMIT BTN
      const response=await axios.put(`${BASE_URL}/user/edit/${id}`,data)
      console.log(response)
      if(response.data.success===true)
        {
         setUpdatedUserData(response.data.updatedUser)
         navigate("/")
        }
    }
    
}
console
useEffect(()=>
  {
  userProfileGet()
  },[id])
  
useEffect(()=>
{
    if(image)
    {
      setImgData("")
        setPreview(URL.createObjectURL(image))
    }

},[image])

  return (
    <>
  <section>
    <div className='register-container container'>
        <div className='common-heading'>
            <h1>Update Your Details</h1>
        </div>
        <div className='register-form '>
        <div className='common-image'>
        <img src={image?preview:`${url}/uploads/${imgData}`}/>
        </div>
            <form className=' form grid grid-two-cols' onSubmit={submitUserData}>
        
                <div className='register-form-left'>

                    <label htmlFor='name'>First Name</label>
                    <input type="text" name="fname" id="name" placeholder='Enter first name' value={inputData.fname} onChange={setInputValue}/>
                    <label htmlFor='email'>Email</label>
                    <input type="text" name="email" id="email" placeholder='Enter email'value={inputData.email} onChange={setInputValue}/>
                    <div className='gender-select'>
                   <p>Select Your Gender</p>
                    <label htmlFor='gender'>Male
                    <input type="radio" name="gender" id="gender" value="male" checked={inputData.gender==="male"?true:false} onChange={setInputValue}/>
                    </label>
                    <label htmlFor='gender'>Female
                    <input type="radio" name="gender" id="gender" value="female"checked={inputData.gender==="female"?true:false}  onChange={setInputValue}/>
                    </label>
                    </div>
                 
                    <label htmlFor='file'>Select Your Profile Image</label>
                    <input type="file" name="user_profile" id="file"  onChange={setProfileImage}/>

                </div>
                <div className='register-form-right'>
                <label htmlFor='name'>Last Name</label>
                <input type="text" name="lname" id="name" placeholder='Enter last name' value={inputData.lname}onChange={setInputValue}/>
                <label htmlFor='mobile'>Last Name</label>
                <input type="text" name="mobile" id="mobile" placeholder='Enter mobile' value={inputData.mobile}onChange={setInputValue}/>

                <label htmlFor='status'>Select Your Status</label>
                <select id="select" onChange={setStatusValue}>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                </select>
                <label htmlFor='location'>Location</label>
                <input type="text" name="location" id="location" placeholder='Enter location' value={inputData.location} onChange={setInputValue}/>

              
                </div>
                <button className='submit-btn' type="submit">Submit</button>
            </form>
        </div>
    </div>

  </section>
      <ToastContainer position="top-center" />
      </>
  )
}

