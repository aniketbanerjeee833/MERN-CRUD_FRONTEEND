import React, { useEffect, useState } from 'react'
import "./Register.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from "react-router-dom"
import axios from 'axios';
import { useAddDataContext } from '../../Components/Context/Context';


export default function Register() {

  const{userAdd,setUserAdd,url}=useAddDataContext();
  const navigate=useNavigate() ; 
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");




;

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  //submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();
    try{
    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "") {
      toast.error("First name is Required !")
    } else if (lname === "") {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (image === "") {
      toast.error("Prfile is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else{

   

      const data = new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("user_profile",image)
      data.append("location",location)
   
      // const config = {
      //   "Content-Type":"multipart/form-data"
      // }

      // const response = await registerfunc(data);
    

   
      const response=await axios.post(`${url}/user/register`,data)
      console.log(response)

      if(response.data.success=== true){
        setInputData({
          ...inputdata,
          fname:"",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        });
        setStatus("");
        setImage("");
        setUserAdd(response.userData)
        navigate("/");
      }else{
        toast.error("Error!")
      }

    }
  }catch(error)
    {
      console.log(error)
      toast.error("Error!")
    }
  }

  





  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
  
   
  }, [image])


  return (
    <>
  <section>
    <div className='register-container container'>
        <div className='common-heading'>
            <h1>Register Your Details</h1>
        </div>
        <div className='register-form '>
        <div className='common-image'>
        <img src={preview?preview:"./image-man.png"}/>
        </div>
            <form className=' form grid grid-two-cols' onSubmit={submitUserData} >
        
                <div className='register-form-left'>

                    <label htmlFor='name'>First Name</label>
                    <input type="text" name="fname" id="name" placeholder='Enter first name' onChange={setInputValue}/>
                    <label htmlFor='email'>Email</label>
                    <input type="text" name="email" id="email" placeholder='Enter email' onChange={setInputValue}/>
                    <div className='gender-select'>
                   <p>Select Your Gender</p>
                    <label htmlFor='gender'>Male
                    <input type="radio" name="gender" id="gender" value="male" onChange={setInputValue}/>
                    </label>
                    <label htmlFor='gender'>Female
                    <input type="radio" name="gender" id="gender" value="female"  onChange={setInputValue}/>
                    </label>
                    </div>
                 
                    <label htmlFor='file'>Select Your Profile Image</label>
                    <input type="file" name="user_profile" id="file"  onChange={setProfile}/>

                </div>
                <div className='register-form-right'>
                <label htmlFor='name'>Last Name</label>
                <input type="text" name="lname" id="name" placeholder='Enter last name' onChange={setInputValue}/>
                <label htmlFor='mobile'>Mobile</label>
                <input type="text" name="mobile" id="mobile" placeholder='Enter mobile' onChange={setInputValue}/>

                <label htmlFor='status'>Select Your Status</label>
                <select id="select" onChange={setStatusValue}>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                </select>
                <label htmlFor='location'>Location</label>
                <input type="text" name="location" id="location" placeholder='Enter location' onChange={setInputValue}/>

              
                </div>
                <button className='submit-btn' type="submit" >Submit</button>
            </form>
        </div>
    </div>

  </section>
      <ToastContainer position="top-center" />
      </>
  )
}
