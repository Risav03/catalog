"use client"

import React, { useEffect, useState } from 'react'

export const PriceModule = () => {

    const getTickerPrice = async () => {
        try {
            const link = "https://api.binance.us/api/v3/ticker/price?symbol=BTCUSDT"
            const link2 = "https://api.binance.us/api/v3/ticker/24hr?symbol=BTCUSDT"

            const priceFetch = await fetch(link);
            const priceBody = await priceFetch.json();

            setPrice(String(Number(priceBody.price).toFixed(2)));

            const res = await fetch(link2);
            const jsonRes = await res.json();

            setPriceChange(jsonRes.priceChange);
            setPercent(jsonRes.priceChangePercent)
        } catch (error) {
          console.error("Error", error);
          throw error;
        }
      }

    const[price, setPrice] = useState<string>("");
    const[priceChange, setPriceChange] = useState<string>("");
    const[percent, setPercent] = useState<string>("");

    useEffect(()=>{
        getTickerPrice();
    },[])

  return (
    <div className='flex flex-col md:gap-8 gap-4 px-20 mb-10 max-md:px-4'>
        <div className='flex gap-4'>
            <h2 className='md:text-[70px] text-5xl'>{Number(price).toLocaleString()}</h2>
            <h3 className='text-[#BDBEBF] text-[24px] mt-2 '>USD</h3>
        </div>
        <div>
            <h2 className={`${priceChange[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} text-[18px]`}>
               {priceChange[0] == "-" ? "$" : "+$"} {(Number(priceChange)).toFixed(2).toLocaleString()} ({(Number(percent)).toFixed(2).toLocaleString()}%)
            </h2>
        </div>
    </div>
  )
}
