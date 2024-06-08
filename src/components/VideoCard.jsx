import React, { useEffect, useState } from 'react'
import {abbreviateNumber} from 'js-abbreviation-number'
import PublishedAt from './PublishedAt'
import { FaCheckCircle } from 'react-icons/fa'
import { apikey } from '../utils/Api';

const VideoCard = ({video}) => {
    const [icon, setIcon] = useState('');

    const getYTContentDetails = async () =>{
        try {
            const res = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${apikey}`);
            const data = await res.json();
            setIcon(data.items[0].snippet.thumbnails.high.url);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        getYTContentDetails();
    },[video])
  return (
    <div className='  rounded-lg overflow-hidden'>
         <div className="flex flex-col mb-4">
                <div className="relative  h-48 md:h-40 lg:h-52 md:rounded-xl overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={video.snippet.thumbnails.medium.url}
                    />
                </div>
                {/* <div className=' text-black absolute bg-black px-2 text-xs w-10 overflow-hidden ml-[16rem] mt-[9rem]'>
                   hi
                </div> */}
                <div className="flex text-black dark:text-white mt-3">
                    <div className="flex items-start">
                        <div className="flex h-9 w-9 rounded-full overflow-hidden">
                            <img
                                className="h-full w-full object-cover"
                                src={icon}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col ml-3 overflow-hidden">
                        <span className="text-sm font-bold line-clamp-2 text-black dark:text-white">
                            {video.snippet.title}
                        </span>
                        <span className="text-[12px] font-semibold mt-2 text-black/[0.7] dark:text-white flex items-center gap-2">
                            {video.snippet.channelTitle}
                            <FaCheckCircle/>
                        </span>
                        <div className="flex text-[12px] font-semibold text-black/[0.7] dark:text-white truncate overflow-hidden">
                            <span>
                                {`${abbreviateNumber(
                                video?.statistics?.viewCount,
                                2
                                )} views`}
                            </span>
                            <span className="flex text-[24px] leading-none font-bold text-black/[0.7] dark:text-white relative top-[-10px] mx-1">
                              .
                            </span>
                            <span className="truncate">
                            <PublishedAt  publishedAt={video?.snippet?.publishedAt}/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default VideoCard