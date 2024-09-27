"use client"
import { useGlobalContext } from '@/context/MainContext'
import React, { useEffect } from 'react'


export const Statistics = () => {

  const { marketCap, ath, athDate, atl, atlDate, circulatingSupply, athPercent, atlPercent, marketCapPercent, dailyChange, weeklyChange, monthlyChange, yearlyChange, dailyLow, dailyHigh } = useGlobalContext()

  return (
    <div className='px-20 max-md:px-2 h-screen flex max-md:flex-col gap-4 max-md:mt-28 mt-10'>
     
      <div className='flex gap-2 flex-col'>
        <div className='py-2 bg-gray-100 relative rounded-lg w-48 max-md:w-full flex items-start max-md:items-center justify-start px-4 flex-col'>
          <h3 className=''>ATH</h3>
            <h3 className='text-2xl font-semibold'>{ath}</h3>
            <h3 className={`text-2xl ${athPercent[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} absolute bottom-9 right-9 font-semibold text-xs`}>{athPercent}</h3>
          <h3 className='text-md -mt-1 text-btc-disabled'>{athDate}</h3>
        </div>
        <div className='py-2 bg-gray-100 rounded-lg w-48 flex items-start max-md:items-center max-md:w-full justify-start px-4 flex-col relative'>
          <h3 className=''>ATL</h3>
            <h3 className='text-2xl font-semibold'>{atl}</h3>
            <h3 className={`text-2xl ${atlPercent[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} absolute bottom-9 right-9 font-semibold text-xs`}>{atlPercent[0] != "-" && "+"}{atlPercent}</h3>
          <h3 className='text-md -mt-1 text-btc-disabled'>{atlDate}</h3>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='w-80 py-2 flex items-center px-4 flex-col bg-gray-100 rounded-lg relative'>
          <h3 className=''>Market Cap</h3>
            <h3 className='text-2xl font-semibold'>{marketCap}</h3>
            <h3 className={`text-2xl ${marketCapPercent[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} absolute bottom-4 right-3 font-semibold text-xs`}>{marketCapPercent[0] != "-" && "+"}{marketCapPercent}</h3>
        </div>
        <div className='w-80 py-2 flex items-center px-4 flex-col bg-gray-100 rounded-lg'>
          <h3 className=''>Circulating Supply</h3>
          <h3 className='text-2xl font-semibold'>{circulatingSupply}</h3>
        </div>
      </div>

      <div className='bg-gray-100 h-fit max-md:w-80 rounded-lg px-4 py-2'>
        <h3>Price Change</h3>
        <div className='flex flex-wrap max-md:items-center max-md:justify-center gap-4 mt-2'>
          <div className='bg-white rounded-md w-28 h-20 flex flex-col items-center justify-center p-2 shadow-xl shadow-black/20'>
              <h3 className='font-semibold text-sm'>24H Change</h3>
              <h3 className={`${dailyChange[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} font-semibold text-lg`}>{dailyChange[0] != "-" && "+"}{dailyChange}</h3>
          </div>
          <div className='bg-white rounded-md w-28 h-20 flex flex-col items-center justify-center p-2 shadow-xl shadow-black/20'>
              <h3 className='font-semibold text-sm'>1W Change</h3>
              <h3 className={`${weeklyChange[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} font-semibold text-lg`}>{weeklyChange[0] != "-" && "+"}{weeklyChange}</h3>
          </div>
          <div className='bg-white rounded-md w-28 h-20 flex flex-col items-center justify-center p-2 shadow-xl shadow-black/20'>
              <h3 className='font-semibold text-sm'>1M Change</h3>
              <h3 className={`${monthlyChange[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} font-semibold text-lg`}>{monthlyChange[0] != "-" && "+"}{monthlyChange}</h3>
          </div>
          <div className='bg-white rounded-md w-28 h-20 flex flex-col items-center justify-center p-2 shadow-xl shadow-black/20'>
              <h3 className='font-semibold text-sm'>1Y Change</h3>
              <h3 className={`${yearlyChange[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} font-semibold text-lg`}>{yearlyChange[0] != "-" && "+"}{yearlyChange}</h3>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
          <div className='py-2 bg-gray-100 max-md:w-full rounded-lg w-48 flex md:items-end items-center justify-start px-4 flex-col'>
              <h3>Daily High</h3>
              <h3 className='text-2xl font-semibold'>{dailyHigh}</h3>
          </div>
          <div className='py-2 bg-gray-100 max-md:w-full rounded-lg w-48 flex md:items-end items-center justify-start px-4 flex-col'>
              <h3>Daily Low</h3>
              <h3 className='text-2xl font-semibold'>{dailyLow}</h3>
          </div>
      </div>
    </div>
  )
}
