import { createContext, useContext, useState } from "react";

const addData = createContext();
const url="http://localhost:5000"
const AddDataProvider=({children})=>
{

    const [userAdd, setUserAdd] = useState("");
    const[updatedUserData,setUpdatedUserData]=useState("")
    const [deleteData, setDeleteData] = useState("");
    return (
    <addData.Provider value={{userAdd,setUserAdd,url,updatedUserData,setUpdatedUserData,deleteData,setDeleteData}}>
    
{children}
    </addData.Provider>)
}

const useAddDataContext=()=>
{
    return useContext(addData)
}

export {useAddDataContext,addData,AddDataProvider}