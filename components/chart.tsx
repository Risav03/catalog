"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import fullscreen from "@/assets/fullscreen.png"
import compare from "@/assets/compare.png"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, ComposedChart, Area, BarChart, CartesianGrid, Legend, Label, ReferenceLine } from 'recharts';


const CustomLabel = ({ active, payload, labelStyle }: any) => {
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
                <p>{`Price: $${Number(data?.Price).toLocaleString()}`}</p>
                <p>{`Date: ${data?.Time} `}</p>
                <p>{`Volume: ${Number(data?.vol).toLocaleString()} BTC`}</p>

            </div>
        );
    }
    return null;
};


const CustomReferenceLineLabel = ({ value, viewBox }: { value: number; viewBox: any, lastPrice: number }) => {
    return (
        <>
            <g className='-translate-y-[0.55rem] absolute z-[1000]'>
                <rect
                    x={viewBox.width - 25}
                    y={viewBox.y - 10}
                    width={100}
                    height={40}
                    rx={10}
                    ry={10}
                    fill="#000000"
                />
                <text
                    x={viewBox.width + 25}
                    y={viewBox.y + 10}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={16}
                    dy={4}
                    fontWeight={800}
                >
                    {Number(value).toLocaleString()}
                </text>
            </g>
        </>
    );
};

export const Chart = () => {

    const [fetchInterval, setFetchInterval] = useState<string>("1d");

    const [domain, setDomain] = useState<number>(500)

    const [dataset, setDataset] = useState([])
    const [lastPrice, setLastPrice] = useState<string>("");
    const [blur, setBlur] = useState(false);

    const link = `https://api.binance.us/api/v3/uiKlines?symbol=BTCUSDT&interval=${fetchInterval}&limit=50`

    async function fetchChart() {
        try {
            const res = await fetch(link);
            const jsonRes = await res.json();
            const datasetSubarr: any = []

            jsonRes.map((item: any, i: number) => {
                const date = new Date(item[6])

                const Time = `${date.getDate()}/${date.getMonth() + 1}`
                const Price = Number(item[4]).toFixed(2);
                const vol = Number(item[5]).toFixed(2)

                datasetSubarr.push({ Time, Price, vol })


            })

            setLastPrice(datasetSubarr[49].Price)
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

    const [activeY, setActiveY] = useState(null);

    const handleMouseMove = (props: any) => {
        setBlur(true)
        if (props && props.activePayload && props.activePayload[0]) {
            setActiveY(props.activePayload[1].value);
        }
    };

    const handleMouseLeave = () => {
        setBlur(false)
        setActiveY(null);
    };
    return (
        <div className='md:w-[85%] mt-20 flex gap-2 px-20 max-md:px-4'>

            <div className='w-full max-md:mt-10'>
                <div className='flex max-md:flex-col md:w-full max-md:overflow-x-scroll'>
                    <div className='flex gap-6 md:w-[30%] max-md:justify-center max-md:items-center'>
                        <button className='flex gap-2 hover:bg-gray-100 duration-200 rounded-lg px-4 py-2'>
                            <Image src={fullscreen} alt='fullscreen' className='w-6 h-6' />
                            <h3 className='text-btc-disabled max-md:hidden '>Fullscreen</h3>
                        </button>
                        <button className='flex gap-2 hover:bg-gray-100 duration-200 rounded-lg px-4 py-2'>
                            <Image src={compare} alt='fullscreen' className='w-6 h-6' />
                            <h3 className='text-btc-disabled  max-md:hidden'>Compare</h3>
                        </button>
                    </div>

                    <div className='flex gap-2 max-md:flex-wrap max-md:justify-center md:w-[65%] items-end justify-end'>
                        <button onClick={() => { setFetchInterval("1d"); setDomain(500) }} className={` duration-200 ${fetchInterval == "1d" ? "text-white bg-[#4B40EE]" : "text-btc-disabled hover:bg-gray-100"} h-10 px-4 rounded-lg `}>1d</button>
                        <button onClick={() => { setFetchInterval("3d"); setDomain(1500) }} className={` duration-200 ${fetchInterval == "3d" ? "text-white bg-[#4B40EE]" : "text-btc-disabled hover:bg-gray-100"} h-10 px-4 rounded-lg `}>3d</button>
                        <button onClick={() => { setFetchInterval("1w"); setDomain(3500) }} className={` duration-200 ${fetchInterval == "1w" ? "text-white bg-[#4B40EE]" : "text-btc-disabled hover:bg-gray-100"} h-10 px-4 rounded-lg `}>1w</button>
                        <button onClick={() => { setFetchInterval("1M"); setDomain(500000) }} className={` duration-200 ${fetchInterval == "1M" ? "text-white bg-[#4B40EE]" : "text-btc-disabled hover:bg-gray-100"} h-10 px-4 rounded-lg `}>1m</button>
                        <button className={` cursor-not-allowed duration-200 ${fetchInterval == "6m" ? "text-white bg-[#4B40EE]" : "text-gray-400 "} h-10 px-4 rounded-lg `}>6m</button>
                        <button className={` cursor-not-allowed duration-200 ${fetchInterval == "1y" ? "text-white bg-[#4B40EE]" : "text-gray-400 "} h-10 px-4 rounded-lg `}>1y</button>
                        <button className={` cursor-not-allowed duration-200 ${fetchInterval == "1y" ? "text-white bg-[#4B40EE]" : "text-gray-400 "} h-10 px-4 rounded-lg `}>max</button>
                    </div>
                </div>
                <div className=" w-full h-[500px] bg-white p-4 relative flex gap-2 mt-10">
                    <div className='h-[500px] w-full relative'>

                        <div className="relative w-full h-full">
                            <div className="absolute xl:-left-[1.8rem] -left-8 max-md:w-full max-lg:w-[87.5%] max-xl:w-[90%] xl:w-[90.8%] 2xl:w-[95.5%] h-full -translate-y-10 grid grid-flow-col grid-cols-6 inset-0 border-x-[1px] border-b-[1px] border-gray-100 pointer-events-none m-10">
                                <div className='border-x-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                            </div>
                            <ResponsiveContainer width="100%" height="100%" >
                                <ComposedChart
                                    data={dataset}
                                    margin={{ top: 10, right: 80, bottom: 10, left: 10 }}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <XAxis dataKey="Time" hide />
                                    <YAxis yAxisId="left" hide />
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
                                    <Tooltip content={<CustomLabel />} />
                                    <Area
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="Price"
                                        stroke="#4B40EE"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorUv)"
                                    />

                                    {activeY !== null && (
                                        <ReferenceLine yAxisId="left" y={activeY} stroke="#000000" strokeDasharray="3 3" className='z-10'>
                                            <Label content={<CustomReferenceLineLabel value={activeY} lastPrice={Number(lastPrice)} viewBox={{}} />} position="right" />
                                        </ReferenceLine>
                                    )}
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={`bg-[#4B40EE] text-white px-2 md:px-4 py-2 rounded-lg absolute top-[4.5rem] -z-[0] max-md:-right-5 -right-[0.7rem] md:w-[6.5rem] w-[5rem] ${blur ? "opacity-25" : "opacity-100"} duration-200 flex items-center justify-center`}>
                            {Number(lastPrice).toLocaleString()}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
