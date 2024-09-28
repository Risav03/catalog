"use client"
import { useGlobalContext } from '@/context/MainContext'
import React from 'react'

export const Settings = () => {

    const{theme, setTheme} = useGlobalContext()
    
  return (
    <div className='px-20 max-md:px-4 mt-20 max-md:mt-10'>
        <h3 className='text-xl'>Theme</h3>
        <div className='flex gap-2 mt-2 items-center mb-10 justify-start'>
            <div onClick={()=>{setTheme(0)}} className={`${theme == 0 && "border-2 border-indigo-400 rounded-xl"} duration-200`} >
                <div className={`w-10 h-10 rounded-lg cursor-pointer m-[0.1rem] hover:scale-105 duration-200 bg-indigo-600 `}></div>
            </div>
            <div onClick={()=>{setTheme(1)}} className={`${theme == 1 && "border-2 border-teal-400 rounded-xl"} duration-200`} >
                <div className={`w-10 h-10 rounded-lg cursor-pointer m-[0.1rem] hover:scale-105 duration-200 bg-teal-600 `}></div>
            </div>
            <div onClick={()=>{setTheme(2)}} className={`${theme == 2 && "border-2 border-blue-400 rounded-xl"} duration-200`} >
                <div className={`w-10 h-10 rounded-lg cursor-pointer m-[0.1rem] hover:scale-105 duration-200 bg-blue-600 `}></div>
            </div>
            <div onClick={()=>{setTheme(3)}} className={`${theme == 3 && "border-2 border-orange-400 rounded-xl"} duration-200`} >
                <div className={`w-10 h-10 rounded-lg cursor-pointer m-[0.1rem] hover:scale-105 duration-200 bg-orange-600 `}></div>
            </div>
            <div onClick={()=>{setTheme(4)}} className={`${theme == 4 && "border-2 border-purple-400 rounded-xl"} duration-200`} >
                <div className={`w-10 h-10 rounded-lg cursor-pointer m-[0.1rem] hover:scale-105 duration-200 bg-purple-600 `}></div>
            </div>
        </div>
    </div>
  )
}
