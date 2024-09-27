"use client"

import React, { useState } from 'react'
import { Chart } from './chart';
import { Summary } from './summary';

export const ButtonSection = () => {

    const[selected, setSelected] = useState<string>("Chart");

  return (
    <div className='md:mt-12 mt-8 max-md:mx-auto'>
        <div className='flex max-md:absolute px-20 max-md:px-4 max-md:left-0 max-md:border-b-[1px] border-gray-100 md:relative w-screen max-md:overflow-x-scroll'>
            <button onClick={()=>{setSelected("Summary")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Summary" ? " border-b-[6px] border-b-[#4B40EE]" : " text-btc-disabled"} `}>Summary</button>
            <button onClick={()=>{setSelected("Chart")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Chart" ? "border-b-[6px] border-b-[#4B40EE]" : "text-btc-disabled"} `}>Chart</button>
            <button onClick={()=>{setSelected("Statistics")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Statistics" ? " border-b-[6px] border-b-[#4B40EE]" : "text-btc-disabled"} `}>Statistics</button>
            <button onClick={()=>{setSelected("Analysis")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Analysis" ? " border-b-[6px] border-b-[#4B40EE]" : "text-btc-disabled"} `}>Analysis</button>
            <button onClick={()=>{setSelected("Settings")}} className={`h-16 flex md:text-[18px] text-md items-center justify-center px-4 duration-150 ${selected == "Settings" ? " border-b-[6px] border-b-[#4B40EE]" : "text-btc-disabled"} `}>Settings</button>

            <div className='absolute -left-20 bottom-0 w-screen h-[0.1rem] bg-gray-100'></div>
        </div>

        {selected == "Chart" && <Chart/>}
        {selected == "Summary" && <div className='w-full flex justify-center items-center'> <Summary/> </div>}

    </div>
  )
}
