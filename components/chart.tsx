"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import fullscreen from "@/assets/fullscreen.png"
import compare from "@/assets/compare.png"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, ComposedChart, Area, BarChart, CartesianGrid, Legend, Label } from 'recharts';


const CustomLabel = ({ active, payload, labelStyle }:any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '5px',
            border: '1px solid #ccc',
            ...labelStyle,
          }}
        >
          <p>{`Price: $${data?.Price}`}</p>
          <p>{`Volume: ${data?.vol} BTC`}</p>
        </div>
      );
    }
    return null;
  };

export const Chart = () => {

    const [fetchInterval, setFetchInterval] = useState<string>("1d");
    
    const [domain, setDomain] = useState<number>(500)
    
    const [dataset, setDataset] = useState([])
    
    const link = `https://api.binance.us/api/v3/uiKlines?symbol=BTCUSDT&interval=${fetchInterval}&limit=30`

    async function fetchChart() {
        try {
            const res = await fetch(link);
            const jsonRes = await res.json();
            const datasetSubarr: any = []

            jsonRes.map((item: any, i: number) => {
                const date = new Date(item[6])

                const Time = `${date.getDate()}/${date.getMonth()}`
                const Price = Number(item[4]).toFixed(2);
                const vol = Number(item[5]).toFixed(2)

                datasetSubarr.push({ Time, Price, vol })

            })

            console.log(datasetSubarr);
            setDataset(datasetSubarr);

        }
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        fetchChart()
    }, [fetchInterval])
    
    const [yPositions, setYPositions] = useState([]);

    const handleMouseEnter = (props:any) => {
        if (props && props.cy) {
            //@ts-ignore
          setYPositions(prevPositions => [...prevPositions, props.cy]);
        }

      };

    return (
        <div className='md:w-[70%] mt-20 flex gap-2'>
            
            <div className='md:w-[1000px]'>
                <div className='flex max-md:flex-col md:w-full max-md:overflow-x-scroll'>
                    <div className='flex gap-6 md:w-[30%] max-md:justify-center max-md:items-center'>
                        <button className='flex gap-2 hover:bg-gray-100 duration-200 rounded-lg px-4 py-2'>
                            <Image src={fullscreen} alt='fullscreen' className='w-6 h-6' />
                            <h3 className='text-gray-600 max-md:hidden '>Fullscreen</h3>
                        </button>
                        <button className='flex gap-2 hover:bg-gray-100 duration-200 rounded-lg px-4 py-2'>
                            <Image src={compare} alt='fullscreen' className='w-6 h-6' />
                            <h3 className='text-gray-600  max-md:hidden'>Compare</h3>
                        </button>
                    </div>

                    <div className='flex gap-2 max-md:flex-wrap max-md:justify-center md:w-[70%] items-end justify-end'>
                        <button onClick={() => { setFetchInterval("1d"); setDomain(500) }} className={` duration-200 ${fetchInterval == "1d" ? "text-white bg-indigo-600" : "text-gray-600 hover:bg-gray-100"} h-10 px-4 rounded-lg `}>1d</button>
                        <button onClick={() => { setFetchInterval("3d"); setDomain(1500) }} className={` duration-200 ${fetchInterval == "3d" ? "text-white bg-indigo-600" : "text-gray-600 hover:bg-gray-100"} h-10 px-4 rounded-lg `}>3d</button>
                        <button onClick={() => { setFetchInterval("1w"); setDomain(3500) }} className={` duration-200 ${fetchInterval == "1w" ? "text-white bg-indigo-600" : "text-gray-600 hover:bg-gray-100"} h-10 px-4 rounded-lg `}>1w</button>
                        <button onClick={() => { setFetchInterval("1M"); setDomain(500000) }} className={` duration-200 ${fetchInterval == "1M" ? "text-white bg-indigo-600" : "text-gray-600 hover:bg-gray-100"} h-10 px-4 rounded-lg `}>1m</button>
                        <button className={` duration-200 ${fetchInterval == "6m" ? "text-white bg-indigo-600" : "text-gray-400 "} h-10 px-4 rounded-lg `}>6m</button>
                        <button className={` duration-200 ${fetchInterval == "1y" ? "text-white bg-indigo-600" : "text-gray-400 "} h-10 px-4 rounded-lg `}>1y</button>
                        <button className={` duration-200 ${fetchInterval == "1y" ? "text-white bg-indigo-600" : "text-gray-400 "} h-10 px-4 rounded-lg `}>max</button>
                    </div>
                </div>
                <div className=" w-full h-[500px] bg-white p-4 relative flex gap-2 mt-10">
                    <div className='h-[500px] w-full '>
                        <div className='absolute bottom-0 left-0 grid grid-flow-col grid-cols-5 w-full h-[500px] '>
                            <div className='border-r-[0.5px] border-gray-200'></div>
                            <div className='border-r-[0.5px] border-gray-200'></div>
                            <div className='border-r-[0.5px] border-gray-200'></div>
                            <div className='border-r-[0.5px] border-gray-200'></div>
                            <div className=''></div>
                        </div>
                        
                        <ResponsiveContainer className="border-x-[1px] w-full h-full max-md:w-80 pb-1 px-0 border-b-[1px] border-gray-100">
                            <ComposedChart
                                data={dataset}
                                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                            >
                                <XAxis dataKey="Time" hide />
                                <YAxis yAxisId="left" width={0} hide />
                                <YAxis yAxisId="right" orientation="right" domain={[0, domain]} hide />
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="30%" stopColor="#E8E7FF" stopOpacity={0.7} />
                                        <stop offset="70%" stopColor="#FFFFFF" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <Bar
                                    barSize={4}
                                    radius={20}
                                    yAxisId="right"
                                    dataKey="vol"
                                    fill="#000000"
                                    opacity={0.1}
                                />
                                <Tooltip  content={<CustomLabel/>} />

                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="Price"
                                    stroke="#4B40EE"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                    onMouseEnter={handleMouseEnter}
                                />

                            </ComposedChart>
                        </ResponsiveContainer>

                    </div>
                    
                </div>
            </div>
            
           
        </div>
    )
}
