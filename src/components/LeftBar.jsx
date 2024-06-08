import React, { useState } from 'react'
import {categories} from '../shared/Constant'
import { useDispatch } from 'react-redux';
import { setCategory } from '../app/features/slice';


const LeftBar = () => {
  const dispatch = useDispatch();
    const [active,setActive] = useState("All");
    const videoByTag = (tag)=>{
        if(active !== tag){
         setActive(tag)
         dispatch(setCategory(tag.name))
        }
    }
  return (
    <div className={`left-bar hidden scrollbar overflow-y-auto w-[60%] h-[calc(100%-3rem)] py-2 bg-gray-200 dark:bg-black absolute  z-10  transition-all lg:w-[15%] lg:right-[85%] border border-black`}>
        <div className=' flex items-center justify-between  gap-5 p-2 flex-col'>
            {categories.map((item,index)=>{
              return (
                <div onClick={()=>videoByTag(item)} key={index} className={
                  `text-black  text-lg font-semibold cursor-pointer w-full h-8 flex items-center px-3 mb-[1px] rounded-lg hover:bg-black/[0.15]  dark:text-white` 
                 }
             >
                 <span className="text-2xl mr-12">{item.icon}</span>
                 {item.name}
              </div>
              )
            })}
        </div>
        <hr className="my-3 border-black/[0.2] dark:border-white" />
        <hr className="my-3 border-black/[0.2] dark:border-white" />
        <div className="text-black/[1.5] dark:text-white text-[16px] ml-2">
            Clone by: Gaurav.@copyright
        </div>
    </div>
  )
}

export default LeftBar