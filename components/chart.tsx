"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import fullscreen from "@/assets/fullscreen.png"
import compare from "@/assets/compare.png"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, ComposedChart, Area, BarChart, CartesianGrid, Legend } from 'recharts';


export const Chart = () => {
    const data = [
        { date: '2023-01-01', price: 62000, volume: 1000 },
        { date: '2023-02-01', price: 63000, volume: 1200 },
        { date: '2023-03-01', price: 64000, volume: 800 },
        { date: '2023-04-01', price: 65000, volume: 1500 },
        { date: '2023-05-01', price: 64500, volume: 900 },
        { date: '2023-06-01', price: 63500, volume: 1100 },
        { date: '2023-07-01', price: 63179.71, volume: 1000 },
    ];

    const [priceData, setPriceData] = useState<Array<any>>([]);
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
    return (
        <div className='w-[70%] mt-20 flex gap-2'>
            <div className='w-[1000px]'>
            <div className='flex w-full'>
                <div className='flex gap-6 w-[30%]'>
                    <button className='flex gap-2 hover:bg-gray-100 duration-200 rounded-lg px-4 py-2'>
                        <Image src={fullscreen} alt='fullscreen' className='w-6 h-6' />
                        <h3 className='text-gray-600'>Fullscreen</h3>
                    </button>
                    <button className='flex gap-2 hover:bg-gray-100 duration-200 rounded-lg px-4 py-2'>
                        <Image src={compare} alt='fullscreen' className='w-6 h-6' />
                        <h3 className='text-gray-600'>Compare</h3>
                    </button>
                </div>

                <div className='flex gap-2 w-[70%] items-end justify-end'>
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
                    <div className='h-[500px] w-full border-x-[1px] border-b-[1px] relative border-gray-200'>
                        <div className='absolute bottom-0 left-0 grid grid-flow-col grid-cols-5 w-full h-[500px] '>
                            <div className='border-x-[0.5px] border-gray-200'></div>
                            <div className='border-x-[0.5px] border-gray-200'></div>
                            <div className='border-x-[0.5px] border-gray-200'></div>
                            <div className='border-x-[0.5px] border-gray-200'></div>
                            <div className='border-x-[0.5px] border-gray-200'></div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%" className="absolute left-0 top-0 border-[1px] border-gray-100">

                            <ComposedChart data={dataset} className=''>
                                <XAxis display="none" dataKey="Time" />
                                <YAxis yAxisId="left" width={0} className='w-0 hidden'/>
                                <YAxis yAxisId="right" width={0} orientation="right" domain={[0, domain]} display="none" />
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="30%" stopColor="#E8E7FF" stopOpacity={0.7} />
                                        <stop offset="70%" stopColor="#FFFFFF" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <Bar barSize={4} radius={20} yAxisId="right" dataKey="vol" fill="#000000" opacity={0.1} />
                                <Tooltip />
                                
                                <Area yAxisId="left" type="monotone" dataKey="Price" stroke="#4B40EE" strokeOpacity={1} strokeWidth={2} fillOpacity={1} className='w-80' fill="url(#colorUv)" />

                            </ComposedChart>
                        </ResponsiveContainer>
                        

                    </div>

                </div>
            </div>
            <div className="flex justify-end mt-28">
                        {/* @ts-ignore */}
                        <div className="bg-indigo-600 p-2 h-10 rounded-md text-white font-bold">{dataset[29]?.Price}</div>
                    </div>
        </div>
    )
}
