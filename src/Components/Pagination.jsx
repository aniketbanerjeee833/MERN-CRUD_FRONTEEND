import React from 'react'

export default function Pagination({page,setPage,pageCount,handleNext,handlePrevious}) {

    
  return (
    

  <div className='pagination'>
    <button onClick={handlePrevious}>-</button>
    <p>{page}</p>
    <button onClick={handleNext}>+</button>
  </div>
  
  
  )
}
