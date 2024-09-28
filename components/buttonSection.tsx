"use client"

import React, { useState } from 'react'
import { Chart } from './chart';
import { Summary } from './summary';
import { Statistics } from './statistics';
import { Settings } from './settings';
import { useGlobalContext } from '@/context/MainContext';

export const ButtonSection = () => {

    const[selected, setSelected] = useState<string>("Chart");
    const {theme} = useGlobalContext()
    const borderColours = ["border-b-[#4B40EE]", "border-b-teal-600", "border-b-blue-600", "border-b-orange-600", "border-b-purple-600"];


  return (
    <div className=' mt-8 max-md:mx-auto pb-20'>
        <div className='flex max-md:absolute px-20 max-md:px-4 max-md:left-0 max-md:border-b-[1px] border-gray-100 md:relative w-screen max-md:overflow-x-scroll'>
            <button onClick={()=>{setSelected("Summary")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Summary" ? " border-b-[6px] "+borderColours[theme] : " text-btc-disabled"} `}>Summary</button>
            <button onClick={()=>{setSelected("Chart")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Chart" ? "border-b-[6px] "+borderColours[theme] : "text-btc-disabled"} `}>Chart</button>
            <button onClick={()=>{setSelected("Statistics")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Statistics" ? " border-b-[6px] "+borderColours[theme] : "text-btc-disabled"} `}>Statistics</button>
            <button onClick={()=>{setSelected("Analysis")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Analysis" ? " border-b-[6px] "+borderColours[theme] : "text-btc-disabled"} `}>Analysis</button>
            <button onClick={()=>{setSelected("Settings")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Settings" ? " border-b-[6px] "+borderColours[theme] : "text-btc-disabled"} `}>Settings</button>

            <div className='absolute -left-20 bottom-0 w-[110vw] h-[0.1rem] bg-gray-100'></div>
        </div>

        {selected == "Chart" && <Chart/>}
        {selected == "Summary" && <div className='w-full flex justify-center items-center'> <Summary/> </div>}
        {selected == "Statistics" && <Statistics/>}
        {selected == "Settings" && <Settings/>}

    </div>
  )
}
