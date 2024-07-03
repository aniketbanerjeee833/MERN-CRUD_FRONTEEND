import React, { useEffect, useState } from 'react'
import "./Home.css"
import Tables from '../Components/Tables'
import { useAddDataContext } from '../Components/Context/Context';

import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { BASE_URL } from '../Components/Services/helper';
import Pagination from '../Components/Pagination';
export default function Home() {
  const{deleteData,setDeleteData,userAdd,setUserAdd,updatedUserData,setUpdatedUserData}=useAddDataContext();
  console.log(userAdd)
  const[displayUserData,setDisplayUserData]=useState("");
  const[search,setSearch]=useState("");
  const[gender,setGender]=useState("All");
  const[status,setStatus]=useState("All");
const[sort,setSort]=useState("new")
const[page,setPage]=useState(1)
const[pageCount,setPageCount]=useState(0)


//DELETE USER
  const deleteUser=async(id)=>
    {
      try{
        const response=await axios.delete(`${BASE_URL}/user/delete/${id}`)
        userGet()
        setDeleteData(response.data.deletedUser)

      }catch(error)
      {
        toast.error("error")
        console.log(error)
      }
    
    }
//PAGINATION
    const handlePrevious=()=>
      {
          setPage(()=>
          {
              if(page===1)
              {
                  return page
              }
              else return page-1
          })
      }
      const handleNext=()=>
      {
          setPage(()=>
          {
              if(page===pageCount)
              {
                  return page
              }
              else return page+1
          })
      }

//GET USERS BASED ON SEARCH OR NOT SEARCH
  const userGet=async()=>
  {
    try{
    
  const response=await axios.get(`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`);
  console.log(response)
;
  
    if(response.data.success===true)
    {
      setDisplayUserData(response.data.userData)
      setPageCount(response.data.Pagination.pageCount)
    }
  }catch(error)
{
console.log(error)
}

  }
  
  console.log(pageCount)

  useEffect(()=>
  {
    userGet();
  },[search,gender,sort,status,page])
  console.log(displayUserData)
  return (
    <section>
     
      <div className='home-div container grid grid-four-rows'>
      {userAdd?<div className='alert-div'>
      {toast.success("added")}
        <button onClick={()=>setUserAdd("")}>X</button>
      </div>:""}
      {updatedUserData?<div className='alert-div'>
        {toast.success("added")}
        <button onClick={()=>setUpdatedUserData("")}>X</button>
      </div>:""}

        <div className='top-div'>

          <div className='top-search-div'>
            <input type="text" name="search" placeholder='Search' id="top-div-input-search" onChange={(e)=>setSearch(e.target.value)}/>
            <button className='search-btn'>Search</button>
          </div>

          <div className='add-btn-div'>
            <button className='add-btn'>
              <NavLink to="/register">
              <i className="fa-solid fa-plus"></i>&nbsp;Add User
              </NavLink>
              </button>
          </div>

        </div>
        <div className='mid-div grid grid-three-cols'>

        
<div className='common-filter'>
 <h2>Filter By Gender</h2>
 <label htmlFor='gender'>All</label>
  <input type="radio" name="gender" id="gender" value="All" onChange={(e)=>setGender(e.target.value)} />
  <label htmlFor='gender'>Male</label>
  <input type="radio" name="gender" id="gender" value="male" onChange={(e)=>setGender(e.target.value)} />
  <label htmlFor='gender'>Female</label>
  <input type="radio" name="gender" id="gender" value="female" onChange={(e)=>setGender(e.target.value)} />
</div>

<div className='common-filter'>
<h2>Sort By Value</h2>
<button onClick={()=>setSort("new")} className={sort==="new"?"new active":"not-new "}>Old first</button>
<button onClick={()=>setSort("old")} className={sort==="new"?"not-new ":"new active"}>Latest first</button>
</div>

<div className='common-filter'>
 <h2>Filter By Status</h2>
 <label htmlFor='status'>All</label>
  <input type="radio" name="status" id="status" value="All" onChange={(e)=>setStatus(e.target.value)} />
  <label htmlFor='status'>Active</label>
  <input type="radio" name="status" id="status" value="Active" onChange={(e)=>setStatus(e.target.value)}  />
  <label htmlFor='status'>Inactive</label>
  <input type="radio" name="status" id="status" value="InActive" onChange={(e)=>setStatus(e.target.value)} />
</div>
</div>
<div className='bottom-div '>
  <Tables 
  displayUserData={displayUserData}
  deleteUser={deleteUser}
  userGet={userGet}
  page={page}
  />
</div>
<div className='fourth-div'>
<Pagination page={page} setPageCount={setPageCount} pageCount={pageCount} setPage={setPage} handleNext={handleNext} handlePrevious={handlePrevious}/>
</div>
      
      </div>
     
    </section>
    
  )
}
