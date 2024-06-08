import React from "react";

import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";
import { GoLightBulb } from "react-icons/go";
import { FaPodcast } from "react-icons/fa6";
import { PiCricketBold } from "react-icons/pi";
import { IoFootballOutline } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";

export const categories = [
    { name: "Home", icon: <AiFillHome />, type: "home" },
    { name: "Trending", icon: <MdLocalFireDepartment />, type: "category" },
    { name: "Music", icon: <CgMusicNote />, type: "category" },
    { name: "Films", icon: <FiFilm />, type: "category" },
    { name: "Live", icon: <MdLiveTv />, type: "category" },
    { name: "Gaming", icon: <IoGameControllerSharp />, type: "category" },
    { name: "News", icon: <ImNewspaper />, type: "category" },
    { name: "Sports", icon: <GiDiamondTrophy />, type: "category" },
    { name: "Learning", icon: <RiLightbulbLine />, type: "category" },
    {
        name: "Fashion & beauty",
        icon: <GiEclipse />,
        type: "category",
    },
    {name: "Courses", icon:<GoLightBulb />, type: "category"},
    {name: "Podcasts", icon:<FaPodcast />, type:"category"}, ,
    {name: "Cricket", icon:<PiCricketBold />, type:"category"}, ,
    {name: "Football", icon:<IoFootballOutline />, type:"category"}, ,
    {name: "Education", icon:<FaBookReader />, type:"category"}, ,
    {name: "Sorts", icon:<SiYoutubeshorts className=" text-red-600" />, type:"category",divider:true}, ,
    { name: "Settings", icon: <FiSettings />, type: "menu" },
    { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
    { name: "Help", icon: <FiHelpCircle />, type: "menu" },
    { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },
]    