import React, { useEffect, useRef } from 'react'
import { BiMicrophone } from 'react-icons/bi';
import { IoIosSearch } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom'
import { setCategory, setSearchSuggestion } from '../app/features/slice';
import { SEARCH_SUGGESTIONS_API } from '../utils/Api';

const SearchPage = () => {
  const [input, setInput] = React.useState('');
  const [suggest, setSuggest] = React.useState(false);
  const dispatch = useDispatch();
  const {showSuggestion} = useSelector((store)=> store.app);


  const searchVideo = () => {
    dispatch(setCategory(input))
    setInput('')
    navigate('/');//most imp line for navigate after serach query
  };



  // const searchingSuggestion =async () => {
  //   try {
  //    const res = await fetch(SEARCH_SUGGESTIONS_API+input)
  //    .then(res=> res.json())
  //    //.then(data => console.log(data))
  //    .then(data => dispatch(setSearchSuggestion(data[1])))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const searchingSuggestion = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/suggestions?q=${input}`);
      const data = await res.json();
      dispatch(setSearchSuggestion(data[1]));
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


  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className=' w-full h-14 p-1 bg-gray-300 dark:bg-black flex  gap-2 '>
      <button onClick={()=>goBack('/')} className=' dark:text-white'><MdArrowBack size={28} /></button>

      <div  className=' flex items-center w-[90%]'>
      <input 
      className=' p-2  w-full rounded-full border border-black dark:border-white' 
      type="text"
      value={input}
      onFocus={()=>openSuggestions('')}
      onChange={(e)=>setInput(e.target.value)}
      placeholder='Search YouTube...'
       />

       <button onClick={searchVideo} 
            className=" w-12 h-10   md:w-[60px]  md:h-10 flex items-center justify-center border  border-black rounded-full bg-white"
        >
            <IoIosSearch size={27} className="dark:text-black text-xl" />
        </button>

      <span className=' w-12 h-10 rounded-full bg-white dark:bg-white dark:text-black flex items-center   border border-black dark:border-white'><BiMicrophone size={28} className=' ml-[4px]'/></span>

      </div>
      
      {
            (suggest && showSuggestion.length !== 0) &&
            <div className=' select  w-[98%] h-auto bg-gray-300 dark:bg-black dark:text-white absolute  rounded-lg mt-14 mx-auto z-40 overflow-x-hidden overflow-y-scroll p-2'>
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
  )
}

export default SearchPage