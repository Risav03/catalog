"use client"
import { useGlobalContext } from '@/context/MainContext'
import React from 'react'

export const Analysis = () => {

    const {communityPos, communityNeg} = useGlobalContext()

  return (
    <div className='mt-20 max-md:mt-10 px-20 max-md:px-4 flex flex-col w-full'>
        <h2 className='text-xl'>Community Sentiment</h2>
        <div className='w-full mt-5 gap-4 flex'>
            <div className='w-1/2 bg-[#67BF6B] text-white font-semibold text-center h-20 rounded-lg text-xl flex items-center justify-center'>
                {communityPos}
            </div>
            <div className='w-1/2 bg-red-500 text-white font-semibold text-center h-20 rounded-lg text-xl flex items-center justify-center'>
                {communityNeg}
            </div>
        </div>
    </div>
  )
}
