import React, { useEffect } from 'react'
import { LuMenu } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import ytlogomobile from '../images/yt-logo-mobile.png';
import ThemeBtn from './ThemeButton';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSearchSuggestion } from '../app/features/slice';
import { IoIosSearch } from 'react-icons/io';
import { SEARCH_SUGGESTIONS_API } from '../utils/Api';

const Header = () => {
  const [input, setInput] = React.useState('');
  const [suggest, setSuggest] = React.useState(false);
  const dispatch = useDispatch();
  const {showSuggestion} = useSelector((store)=> store.app);

  const openLeftBar = () => {
    document.querySelector('.left-bar').classList.toggle('hidden');
    document.querySelector('.left-bar').classList.toggle('block');
  } ;

  //this is for large screens
  const searchVideo = () => {
    dispatch(setCategory(input))
   setInput('')
  };
  const searchingSuggestion =async () => {
    try {
     const res = await fetch(SEARCH_SUGGESTIONS_API+input)
     .then(res=> res.json())
     //.then(data => console.log(data))
     .then(data => dispatch(setSearchSuggestion(data[1])))
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    const timer = setTimeout(() => {
      searchingSuggestion();
    }, 200);

    return()=>{
        clearTimeout(timer)
    }
 },[input]);
 const openSuggestions = async (suggestion) => {
    setInput(suggestion)
    setSuggest(true);
 }



  return (
    <div className=' w-full fix h-14 z-20 bg-gray-200 dark:bg-black flex items-center justify-between p-2 lg:p-3 '>
      <div className=' flex items-center dark:text-white gap-1 lg:gap-4'>
        <span onClick={openLeftBar}><LuMenu size={24}/></span>
        <span  className=' w-10'><img src={ytlogomobile} alt="icon" /></span>
        <span className=' font-semibold text-2xl leading-tight'>YouTube</span>
      </div>

      <div className='hidden lg:block w-1/2 h-10 '>
        <div className=' flex items-center w-[80%] h-full '>
           <input 
             className=' w-full h-full border border-black dark:border-gray-800        dark:bg-white outline-none rounded-l-full p-3'
               type="text"
               value={input}
               onFocus={()=>openSuggestions('')}
               onChange={(e)=>setInput(e.target.value)}
               placeholder='Enter Your Search'
            />
            <IoSearchSharp onClick={searchVideo} className=' bg-gray-400 w-[10%] h-full border border-black dark:border-gray-800 rounded-r-full' size={20}/>

            {
            (suggest && showSuggestion.length !== 0) &&
            <div className=' select  w-[37%] h-auto bg-gray-300 dark:bg-slate-800 dark:text-white absolute  rounded-lg mt-[24rem] mx-auto z-40 overflow-x-hidden overflow-y-scroll p-2'>
             <div>
                <ul>
                   {
                     showSuggestion.map((suggestion,idx)=> {
                        return (
                             <div onClick={()=>openSuggestions(suggestion)} key={idx} className=' flex items-center hover:bg-gray-300'>
                                <IoIosSearch size={22}/>
                                <li className=' font-semibold text-md ml-1 p-1 cursor-pointer' >{suggestion}</li>
                             </div>
                        )
                      })
                   }
                </ul>
             </div>
        </div>
        }
        </div>
      </div>

      <div>
          <div className=' flex items-center gap-2 dark:text-white lg:gap-4'>
               <span><ThemeBtn size={24}/></span>
              <Link to={`/searchpage`}> <span className=' lg:hidden'><IoSearchSharp size={25}/></span></Link>
               <span className=' w-10 h-10 bg-red-400 rounded-full overflow-hidden'>
                <img className=' w-full h-full object-cover' src="https://images.pexels.com/photos/23516314/pexels-photo-23516314/free-photo-of-marca-moda-mjbydud.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
               </span>
          </div>
      </div>
    </div>
  )
}

export default Header