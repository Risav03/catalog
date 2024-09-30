"use client"

import { useGlobalContext } from '@/context/MainContext'
import React, { useEffect, useState } from 'react'

export const PriceModule = () => {

  const{hoveringPrice, type} = useGlobalContext();

    const getTickerPrice = async () => {
        try {
          if(type == "USD"){
            const link = "https://api.binance.us/api/v3/ticker/price?symbol=BTCUSDT"
            const link2 = "https://api.binance.us/api/v3/ticker/24hr?symbol=BTCUSDT"

            const priceFetch = await fetch(link);
            const priceBody = await priceFetch.json();

            setPriceNumber(priceBody.price);
            setPrice(String(Number(priceBody.price).toFixed(2)));
            
            const res = await fetch(link2);
            const jsonRes = await res.json();

            let [integerPart, decimalPart] = Number(jsonRes.priceChange).toFixed(2).split('.');
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            setPriceChange(integerPart+"."+decimalPart);
            setPercent(jsonRes.priceChangePercent)
          }

          if(type == "BNB"){
            const link = "https://api.binance.us/api/v3/ticker/price?symbol=BNBBTC"
            const link2 = "https://api.binance.us/api/v3/ticker/24hr?symbol=BNBBTC"

            const priceFetch = await fetch(link);
            const priceBody = await priceFetch.json();

            setPriceNumber(1/priceBody.price);
            setPrice((1 / Number(priceBody.price)).toFixed(2));
            
            const res = await fetch(link2);
            const jsonRes = await res.json();

            console.log(jsonRes.priceChange);

            let [integerPart, decimalPart] = Number(jsonRes.priceChange).toFixed(2).split('.');
            integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            setPriceChange(integerPart+"."+decimalPart);
            setPercent(jsonRes.priceChangePercent)
          }
        } catch (error) {
          console.error("Error", error);
          throw error;
        }
      }

    const[price, setPrice] = useState<string>("");
    const[priceNumber, setPriceNumber] = useState<number>(0);

    const[priceChange, setPriceChange] = useState<string>("");
    const[percent, setPercent] = useState<string>("");
  

    function calculate(){
      const diff = hoveringPrice - priceNumber;
      const percentage = ((Number((diff/priceNumber)))*100)

      let [integerPart, decimalPart] = diff.toFixed(2).split('.');
  
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');


      setPriceChange(integerPart+"."+decimalPart);
      setPercent(percentage.toLocaleString())
    }

    useEffect(()=>{
      if(hoveringPrice > 0){
        calculate()
      }

      if(hoveringPrice == 0){
        getTickerPrice()
      }
    },[hoveringPrice])

    useEffect(()=>{
        getTickerPrice();
    },[type])

  return (
    <div className='flex flex-col md:gap-8 gap-4 px-20 mb-10 max-md:px-4'>
        <div className='flex gap-4'>
            <h2 className='md:text-[70px] text-5xl'>{hoveringPrice>0 ? Number(hoveringPrice).toLocaleString() : Number(price).toLocaleString()}</h2>
            <h3 className='text-[#BDBEBF] text-[24px] mt-2 '>{type}</h3>
        </div>
        <div>
            <h2 className={`${priceChange[0] == "-" ? "text-red-500" : "text-[#67BF6B]"} text-[18px]`}>
               {priceChange[0] == "-" ? "" : "+"} {priceChange} ({(Number(percent)).toFixed(2).toLocaleString()}%)
            </h2>
        </div>
    </div>
  )
}
