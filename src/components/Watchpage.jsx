import React, { useEffect, useState } from 'react'
import { LuEye } from 'react-icons/lu'
import { MdThumbUp } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'
import SuggestionVideoCard from './SuggestionVideoCard'
import TagDisplay from './TagDisplay'
import { apikey } from '../utils/Api'
import { Link, useSearchParams } from 'react-router-dom'
import ReactPlayer from "react-player/youtube";
import { abbreviateNumber } from 'js-abbreviation-number'
import VideoPublishedAt from './PublishedAt'

const Watchpage = () => {
  const [video, setVideo] = useState();
  const [icon, setIcon] = useState("");
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');

  const getSingleVideoInfo = async () => {
      try {
          const res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apikey}`)
          const data = await res.json();
          setVideo(data);
      } catch (error) {
          console.log(error);
      }
  };

  const getChannelIcon = async () => {
    try {
      const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apikey}`);
      const videoData = await videoResponse.json();
      const channelId = videoData.items[0].snippet.channelId;

      const channelResponse = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apikey}`);
      const channelData = await channelResponse.json();
      const channelIconUrl = channelData.items[0].snippet.thumbnails.default.url;
      setIcon(channelIconUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=15&regionCode=IN&key=${apikey}`);
      const data = await res.json();
      setRelatedVideos(data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (videoId) {
      getSingleVideoInfo();
      getChannelIcon();
      fetchRelatedVideos();
    }
  }, [videoId]);

  return (
    <div className=" flex w-full absolute h-[100%] bg-gray-200 dark:bg-black  ">
    <div className="w-full  absolute  max-w-[1280px] flex flex-col lg:flex-row ">
        <div className="fix flex flex-col h-[280%] lg:h-full   lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto  mt-1">
            <div className="h-[250px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    style={{ backgroundColor: "#000000" }}
                    playing={true}
            />
            </div>
            <div className="text-black dark:text-white font-bold text-sm md:text-xl mt-3 line-clamp-2 ">
                {video?.items[0]?.snippet?.title}
            </div>
            <div className="flex justify-between flex-col md:flex-row mt-4 ">
                <div className="flex h-12 ">
                    <div className="flex items-start ">
                        <div className="flex h-11 w-11 rounded-full overflow-hidden">
                            <img
                                className="h-full w-full object-cover"
                                src={icon}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col ml-1 ">
                        <div className=" w-[80%] text-black dark:text-white  text-md font-semibold flex items-center ine-clamp-2 ">
                            {video?.items[0]?.snippet?.channelTitle}  
                        </div>
                        <div className="text-black/[0.7] dark:text-white   text-sm ">
                            <FaCheckCircle/>
                        </div>
                    </div>

                <div className="flex text-black dark:text-white  gap-1 md:mt-0 absolute right-5 lg:left-[54rem]">
                    <div onClick={()=>setColor('red')} className="flex items-center justify-center h-10 px-4 rounded-full bg-black/[0.30] dark:bg-white dark:text-black mt-1 font-semibold">
                        <MdThumbUp size={25}  className="text-sm text-black mr-2" />
                        {`${abbreviateNumber(
                            video?.items[0].statistics?.likeCount,
                            2
                        )}`}
                    </div>
                </div>
                </div>
            </div>

                <div className=' w-full overflow-x-hidden  bg-zinc-400 mt-4 p-2 rounded-lg '>
                  <h1 className=' font-bold text-lg'><span className=' text-md font-semibold'>Total Comments</span>: {video?.items[0]?.statistics.commentCount}</h1>
                  <div className=' flex gap-3'>
                    <h2 className=' font-medium text-lg w-fit'> 
                        {`${abbreviateNumber(
                            video?.items[0].statistics?.viewCount,
                            2
                        )} views`}
                     </h2>
                    <h2 className=' font-medium text-lg '> 
                       <VideoPublishedAt publishedAt={video?.items[0].snippet?.publishedAt}/>
                     </h2>
                  </div>

                  <div></div>
                </div>
        </div>
        <div className="flex flex-col  py-6 px-4 overflow-y-scroll lg:w-[350px] xl:w-[400px] border border-t-black dark:border-t-white scrollbar ">
        {relatedVideos?.map((item) => (
          <Link key={typeof item.id === 'object' ? item.id.videoId : item.id} to={`/watchpage?v=${typeof item.id === 'object' ? item.id.videoId : item.id}`}>
           <SuggestionVideoCard video={item} />
          </Link>
         ))}
        </div>
    </div>
    </div>
  )
}

export default Watchpage