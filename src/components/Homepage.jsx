import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import {setHomeVideo} from '../app/features/slice'
import {useDispatch , useSelector} from 'react-redux'
import { apikey, vedio_url } from '../utils/Api';
import ButtonList from './ButtonList';

const Homepage = () => {
  const {video, category} = useSelector((store)=> store.app);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //fetching stats bcoz our api is not provide it
  const fetchVideoStats = async (videoIds) => {
    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(',')}&key=${apikey}`);
      const data = await res.json();
      dispatch(setHomeVideo(data?.items));
    } catch (error) {
      console.log(error);
    }
  };


  const fetchHomeVideo = async () => {
    setLoading(true); 
    setTimeout(async () => {
      try {
        const res = await fetch(vedio_url);
        const data = await res.json();
        dispatch(setHomeVideo(data?.items));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    }, 1000); 
  };

  const fetchVideoByCategory = async () => {
    setLoading(true); 
    setTimeout(async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${apikey}`);
        const data = await res.json();

        // Fetching the video stats
        const videoIds = data.items.map((item) => item.id.videoId).filter((id) => id);

        if (videoIds.length > 0) {
          await fetchVideoStats(videoIds);
        } else {
          dispatch(setHomeVideo([]));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    }, 1000); 
  };

  useEffect(() => {
    if (category ) {
      fetchVideoByCategory();
    } else {
      fetchHomeVideo();
    }
  }, [category]);



useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
}, []);
  return (
       <div className="flex absolute w-full  dark:bg-black  h-[calc(100%-56px)]">
            <div className="grow w-[calc(100%-240px)] h-full scrollbar overflow-y-auto ">
              <div className=' text-white w-[100%] overflow-y-hidden overflow-x-scroll h-12 sticky no-scrollbar  mx-auto'>
                <ButtonList/>
              </div>

               {loading ? (
                 <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 '>
                 {
                  video.map((item,idx)=>(
                    <div key={idx} role="status" className="w-full flex flex-col border border-gray-500 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                    <div className="flex items-center justify-center  h-48 mb-4 bg-gray-400 rounded dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                        </svg>
                    </div>
                    <div className="flex items-center mt-4">
                       <svg className="w-10 h-10 me-3 text-gray-300 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                            <div className="w-48 h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>
                        </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                    </div>
                  ))
                 }
                 </div>
               ) : 
               (
                <div   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 ">
                {video.map((item)=>(
                  <Link key={typeof item.id === 'object' ? item.id.videoId : item.id} to={`/watchpage?v=${typeof item.id === 'object' ? item.id.videoId : item.id}`}>
                  <VideoCard video={item}/>
                  </Link>
                ))}
                </div>
               )}
            </div>
      </div>
  )
}

export default Homepage