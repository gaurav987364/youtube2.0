import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategory } from '../app/features/slice'

const btnItems = [
   "All", "Music", "Gaming","Javascript", "Java","React","Technology","Android","Vlogs","Nature","Fantasy","Cricket","Fifa","Apple","Jobs","Songs","Trending","Stokings","Elections","Football","Codewithharry","BJP","Hollywood","Fantasy","Bollywood"
]
const ButtonList = () => {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch()

  const videoByTag = (tag)=>{
   if(active !== tag){
    setActive(tag)
    dispatch(setCategory(tag))
   }
  }
  return (
    <div className=' flex  overflow-x-auto w-full h-10 my-2 no-scrollbar'>
        {btnItems.map((item,index)=>(
            <div key={index} >
              <button onClick={()=> videoByTag(item)}  className={`px-3 py-1 ${active=== item ? "bg-black text-white":"bg-gray-300 text-black"} dark:bg-white dark:text-black rounded-full text-sm font-semibold mx-1 whitespace-nowrap`}><span className="whitespace-nowrap">{item}</span></button>
            </div>
        ))}
    </div>
  )
}

export default ButtonList