import React from 'react'
import useTheme from '../context/Context'
import { BsFillMoonStarsFill } from "react-icons/bs";

const ThemeBtn = () => {
   const {darkTheme, lightTheme,theme} =  useTheme(); ///hamarae custom hook se sabhi chije nikal li 
   const onChangeBtn = (e)=>{
    const darkModeStatus = e.currentTarget.checked;
    console.log(darkModeStatus);
    if(darkModeStatus){
        darkTheme();
    }else{
        lightTheme();
    }
   }
  return (
    <label className="relative inline-flex items-center cursor-pointer">
        <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={theme === "dark"}
        />
       <div className="w-8 h-8 rounded-full flex items-center justify-center">
        <BsFillMoonStarsFill size={22}/>
       </div>
   </label>
  )
}

export default ThemeBtn