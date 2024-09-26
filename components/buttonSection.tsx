"use client"

import React, { useState } from 'react'
import { Chart } from './chart';

export const ButtonSection = () => {

    const[selected, setSelected] = useState<string>("Chart");

  return (
    <div className='md:mt-12 mt-8'>
        <div className='flex max-md:absolute max-md:left-0 max-md:border-b-[1px] border-gray-100 md:relative w-screen max-md:overflow-x-scroll'>
            <button onClick={()=>{setSelected("Summary")}} className={`h-16 flex md:text-xl text-md items-center justify-center px-4 font-semibold duration-150 ${selected == "Summary" ? "text-black border-b-[6px] border-b-indigo-600" : "text-gray-400"} `}>Summary</button>
            <button onClick={()=>{setSelected("Chart")}} className={`h-16 flex md:text-xl text-md items-center justify-center px-4 font-semibold duration-150 ${selected == "Chart" ? "text-black border-b-[6px] border-b-indigo-600" : "text-gray-400"} `}>Chart</button>
            <button onClick={()=>{setSelected("Statistics")}} className={`h-16 flex md:text-xl text-md items-center justify-center px-4 font-semibold duration-150 ${selected == "Statistics" ? "text-black border-b-[6px] border-b-indigo-600" : "text-gray-400"} `}>Statistics</button>
            <button onClick={()=>{setSelected("Analysis")}} className={`h-16 flex md:text-xl text-md items-center justify-center px-4 font-semibold duration-150 ${selected == "Analysis" ? "text-black border-b-[6px] border-b-indigo-600" : "text-gray-400"} `}>Analysis</button>
            <button onClick={()=>{setSelected("Settings")}} className={`h-16 flex md:text-xl text-md items-center justify-center px-4 font-semibold duration-150 ${selected == "Settings" ? "text-black border-b-[6px] border-b-indigo-600" : "text-gray-400"} `}>Settings</button>

            <div className='absolute -left-20 bottom-0 w-screen h-[0.1rem] bg-gray-100'></div>
        </div>

        {selected == "Chart" && <Chart/>}

    </div>
  )
}
