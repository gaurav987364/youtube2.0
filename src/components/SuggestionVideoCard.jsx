import { abbreviateNumber } from 'js-abbreviation-number'
import React from 'react'
import VideoPublishedAt from './PublishedAt'

const SuggestionVideoCard = ({video}) => {
  return (
    <div className="flex mb-3">
    <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
        <img
            className="h-full w-full object-cover"
            src={video?.snippet?.thumbnails?.high.url}
        />
    </div>
    <div className="flex flex-col ml-3 overflow-hidden">
        <span className="text-sm lg:text-xs xl:text-sm font-bold line-clamp-2 text-black dark:text-white">
            {video?.snippet?.title}
        </span>
        <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold mt-2 text-black dark:text-white/[0.7] flex items-center">
            {video?.snippet?.channelTitle}
        </span>
        <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-black dark:text-white/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(
                video?.statistics?.viewCount
            )} views`}</span>
            <span className="flex text-[24px] leading-none font-bold text-black dark:text-white/[0.7] relative top-[-10px] mx-1">
                .
            </span>
            <span className="truncate">
            <VideoPublishedAt publishedAt={video?.snippet?.publishedAt}/>
            </span>
        </div>
    </div>
</div>
  )
}

export default SuggestionVideoCard