"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import fullscreen from "@/assets/fullscreen.png"
import bnb from "@/assets/bnb.png"
import tether from "@/assets/tether.png"
import compare from "@/assets/compare.png"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, ComposedChart, Area, BarChart, CartesianGrid, Legend, Label, ReferenceLine } from 'recharts';
import { useGlobalContext } from '@/context/MainContext';
import { MdCloseFullscreen } from 'react-icons/md';


const CustomLabel = ({ active, payload, labelStyle, pair }: any) => {
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
                <p>{`Price: ${pair == "1" ? "$" : ""}${Number(data?.Price).toLocaleString()} ${pair == "2" ? "BNB" : ""}`}</p>
                <p>{`Date: ${data?.Time} `}</p>
                <p>{`Volume: ${Number(data?.vol).toLocaleString()} ${pair == "2" ? "BNB" : "BTC"}`}</p>

            </div>
        );
    }
    return null;
};


const CustomReferenceLineLabel = ({ value, viewBox, pair }: { value: number; viewBox: any; pair: string }) => {

    const{setHoveringPrice} = useGlobalContext();

    setHoveringPrice(value);

    return (
        <>
            <g className='-translate-y-[0.55rem] absolute z-[1000]'>
                <rect
                    x={viewBox.width - 20}
                    y={viewBox.y - 10}
                    width={110}
                    height={40}
                    rx={10}
                    ry={10}
                    fill="#1A243A"
                />
                <text
                    x={viewBox.width + 35}
                    y={viewBox.y + 11}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={18}
                    dy={4}
                    fontWeight={100}
                >
                    {Number(value).toLocaleString()}
                </text>
            </g>
        </>
    );
};

const CustomReferenceLineLabel2 = ({ value, viewBox, color }: { value: number; viewBox: any; color: string }) => {
    return (
        <>
            <g className='-translate-y-[0.55rem] absolute z-[1000]'>
                <rect
                    x={viewBox.width - 20}
                    y={viewBox.y - 10}
                    width={110}
                    height={40}
                    rx={10}
                    ry={10}
                    fill={color}
                />
                <text
                    x={viewBox.width + 35}
                    y={viewBox.y + 11}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={18}
                    dy={4}
                    fontWeight={100}
                >
                    {Number(value).toLocaleString()}
                </text>
            </g>
        </>
    );
};

export const Chart = () => {

    const [fetchInterval, setFetchInterval] = useState<string>("1d");

    const { theme, setHoveringPrice, setType } = useGlobalContext()
    const [domain, setDomain] = useState<number>(500)
    const btcDomain = 80000;
    const [domain2, setDomain2] = useState<number>(5000);

    const [bnbDomain, setBnbDomain] = useState<number>(100);

    const [dataset, setDataset] = useState([])
    const [dataset2, setDataset2] = useState([])

    const [lastPrice, setLastPrice] = useState<string>("");
    const [lastPrice2, setLastPrice2] = useState<string>("");

    const [compareDiv, setCompareDiv] = useState<boolean>(false);

    const [pair, setPair] = useState<string>("BTCUSDT");

    const [blur, setBlur] = useState(false);

    const [fullscreenMode, setFullscreenMode] = useState<boolean>(false);

    const linkBTC = `https://api.binance.us/api/v3/uiKlines?symbol=BTCUSDT&interval=${fetchInterval}&limit=60`
    const linkBNB = `https://api.binance.us/api/v3/uiKlines?symbol=BNBBTC&interval=${fetchInterval}&limit=60`


    const bgColours = ["bg-[#4B40EE]", "bg-teal-600", "bg-blue-600", "bg-orange-600", "bg-purple-600"];
    const colours = ["#4B40EE", "#0d9489", "#2564eb", "#d97706", "#9233ea"];

    async function fetchChart(link: string) {
        try {
            
            const res = await fetch(link);
            const jsonRes = await res.json();
            const datasetSubarr: any = []
            console.log(jsonRes);

            jsonRes.map((item: any, i: number) => {
                const date = new Date(item[6])

                const Time = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

                var Price;
                if (pair == "BNBBTC") {
                    Price = (1 / Number(item[4])).toFixed(2);
                }
                if (pair == "BTCUSDT") {
                    Price = Number(item[4]).toFixed(2);
                }
                const vol = Number(item[5]).toFixed(2)

                datasetSubarr.push({ Time, Price, vol })

            })

            if (pair == "BNBBTC") {
                setLastPrice2(datasetSubarr[59].Price)
                setDataset2(datasetSubarr);
            }
            else {
                setLastPrice(datasetSubarr[59].Price)
                setDataset(datasetSubarr);
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("HELLO")
        if (pair == "BNBBTC") {
            fetchChart(linkBNB);
            setDomain2(5000)
        }
        if (pair == "BTCUSDT") {
            fetchChart(linkBTC)
        }
    }, [fetchInterval, pair])

    const [activeY, setActiveY] = useState(null);

    const handleMouseMove = (props: any) => {
        setBlur(true)
        if (props && props.activePayload && props.activePayload[0]) {
            setActiveY(props.activePayload[1].value);
        }
    };

    const handleFullScreen = () => {
        const element = document.getElementById("fullscreen_comp");

        if (!fullscreenMode) {
            element?.requestFullscreen();
            setFullscreenMode(true);
        }
        else {
            document?.exitFullscreen();
            setFullscreenMode(false);
        }
    }

    const handleMouseLeave = () => {
        setBlur(false);
        setHoveringPrice(0);
        setActiveY(null);
    };
    return (
        <div className={` ${fullscreenMode ? "w-full" : "md:w-[85%]"} mt-20 max-md:mt-10 mb-10 flex gap-2 px-20 max-md:px-4  `}>

            <div id="fullscreen_comp" className={`w-full bg-white ${fullscreenMode && "md:p-24 max-md:p-4 translate-x-20 "} `}>
                <div className='flex max-md:flex-col md:w-full max-md:overflow-x-scroll'>
                    <div className='flex gap-6 md:w-[30%] max-md:mb-4 max-md:justify-center max-md:items-center'>
                        <button onClick={() => { handleFullScreen() }} className='flex gap-2 hover:bg-gray-100 duration-200 rounded-lg px-4 h-10 items-center'>
                            {fullscreenMode ? <div className='flex gap-2 items-center'>
                                <MdCloseFullscreen className='text-btc-disabled text-xl' />
                                <h3 className='text-btc-disabled max-md:hidden md:text-[18px] '>Exit Fullscreen</h3>
                            </div> : <div className='flex gap-2 items-center'>
                                <Image src={fullscreen} alt='fullscreen' className='w-6 h-6' />
                                <h3 className='text-btc-disabled max-md:hidden md:text-[18px] '>Fullscreen</h3>
                            </div>}
                        </button>
                        <div className='relative flex gap-2'>
                            <button onClick={() => { setCompareDiv((prev) => !prev) }} className={`flex gap-2 ${compareDiv ? bgColours[theme] + " text-white " : "bg-white text-btc-disabled hover:bg-gray-100 "} relative z-10 duration-200 rounded-lg px-4 h-10 items-center`}>
                                <Image src={compare} alt='fullscreen' className={`w-6 h-6 ${compareDiv && "brightness-200 contrast-200"} `} />
                                <h3 className='  max-md:hidden md:text-[18px]'>Compare</h3>
                            </button>
                            <div className={`bg-gray-100 ${compareDiv ? "translate-x-[3rem] md:translate-x-[8.6rem] " : "translate-x-1"} z-0 duration-200 hover:bg-gray-200 cursor-pointer absolute w-[3rem] md:w-20 h-10 flex items-center justify-center rounded-r-lg`} >
                                {pair == "BTCUSDT" ? <button onClick={() => { setCompareDiv(false); setPair("BNBBTC"); setType("BNB") }} className='flex gap-2 w-full justify-center items-center'><Image src={bnb} alt='bnb' className='w-6 h-6' /></button> :
                                    <button onClick={() => { setCompareDiv(false); setType("USD"), setPair("BTCUSDT") }} className='flex gap-2 w-full justify-center items-center'><Image src={tether} alt='bnb' className='w-6 h-6' /></button>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={`flex gap-2 max-md:flex-wrap max-md:justify-center md:w-[62%] items-end justify-end`}>
                        <button onClick={() => { setFetchInterval("1d"); setDomain(500); setDomain2(5000); setBnbDomain(150) }} className={` duration-200 ${fetchInterval == "1d" ? "text-white " + bgColours[theme] : "text-btc-disabled hover:bg-gray-100"} h-10 px-4 rounded-lg md:text-[18px]`}>1d</button>
                        <button onClick={() => { setFetchInterval("3d"); setDomain(1500); setDomain2(15000); setBnbDomain(150) }} className={` duration-200 ${fetchInterval == "3d" ? "text-white " + bgColours[theme] : "text-btc-disabled hover:bg-gray-100"} h-10 px-4 rounded-lg md:text-[18px]`}>3d</button>
                        <button onClick={() => { setFetchInterval("1w"); setDomain(50000); setDomain2(100000); setBnbDomain(200) }} className={` duration-200 ${fetchInterval == "1w" ? "text-white " + bgColours[theme] : "text-btc-disabled hover:bg-gray-100"} h-10 px-4 rounded-lg md:text-[18px]`}>1w</button>
                        <button onClick={() => { setFetchInterval("1M"); setDomain(500000); setDomain2(5000000); setBnbDomain(800) }} className={` duration-200 ${fetchInterval == "1M" ? "text-white " + bgColours[theme] : "text-btc-disabled hover:bg-gray-100"} h-10 px-4 rounded-lg md:text-[18px]`}>1m</button>
                        <button className={` cursor-not-allowed duration-200 ${fetchInterval == "6m" ? "text-white" + bgColours[theme] : "text-gray-400 "} h-10 px-4 rounded-lg md:text-[18px]`}>6m</button>
                        <button className={` cursor-not-allowed duration-200 ${fetchInterval == "1y" ? "text-white " + bgColours[theme] : "text-gray-400 "} h-10 px-4 rounded-lg md:text-[18px]`}>1y</button>
                        <button className={` cursor-not-allowed duration-200 ${fetchInterval == "1y" ? "text-white " + bgColours[theme] : "text-gray-400 "} h-10 px-4 rounded-lg md:text-[18px]`}>max</button>
                    </div>
                </div>

                {pair == "BNBBTC" ?
                    <div className=" w-full h-[500px] bg-white p-4 relative flex gap-2 mt-10">
                        <div className='h-[500px] w-full relative'>

                            <div className={`relative w-full max-md:w-[110%] h-full`}>

                                <div id="border" className={` absolute xl:-left-[1.8rem] -left-8 max-md:w-full ${fullscreenMode ? "max-lg:w-[88%] max-xl:w-[90.5%] xl:w-[91.3%] max-[1440px]:w-[94%] min-[1440px]:w-[92.3%] min-[1550px]:w-[92.5%] min-[1700px]:w-[94.6%] min-[2100px]:w-[95.9%]" : "max-lg:w-[87.5%] max-xl:w-[90%] xl:w-[90.8%] max-[1440px]:w-[93.5%] min-[1440px]:w-[91.5%] min-[1550px]:w-[92%] min-[1700px]:w-[94%] min-[2100px]:w-[95.3%]"} h-full -translate-y-10 grid grid-flow-col grid-cols-6 inset-0 border-x-[1px] border-b-[1px] border-gray-100 pointer-events-none m-10`}>
                                    <div className='border-x-[0.5px] border-gray-200'></div>
                                    <div className='border-r-[0.5px] border-gray-200'></div>
                                    <div className='border-r-[0.5px] border-gray-200'></div>
                                    <div className='border-r-[0.5px] border-gray-200'></div>
                                    <div className='border-r-[0.5px] border-gray-200'></div>
                                    <div className='border-r-[0.5px] border-gray-200'></div>
                                </div>

                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart
                                        data={dataset2}
                                        margin={{ top: 10, right: 80, bottom: 10, left: 10 }}
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <XAxis dataKey="Time" hide />
                                        <YAxis yAxisId="left" domain={[0, bnbDomain]} hide />
                                        <YAxis yAxisId="right" orientation="right" domain={[0, domain2]} hide />
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="30%" stopColor={colours[theme]} stopOpacity={0.07} />
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

                                        <Tooltip content={<CustomLabel pair={"2"} />} />
                                        <Area
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="Price"
                                            stroke={colours[theme]}
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorUv)"
                                        />

                                        <ReferenceLine yAxisId="left" y={Number(lastPrice2)} strokeOpacity={0} className='z-10'>
                                            <Label content={<CustomReferenceLineLabel2 value={Number(lastPrice2)} color={colours[theme]} viewBox={{}} />} position="right" />
                                        </ReferenceLine>


                                        {activeY !== null && (
                                            <ReferenceLine yAxisId="left" y={activeY} stroke="#000000" strokeDasharray="3 3" className='z-10'>
                                                <Label content={<CustomReferenceLineLabel value={activeY + 200} pair={"2"} viewBox={{}} />} position="right" />
                                            </ReferenceLine>
                                        )}
                                    </ComposedChart>
                                </ResponsiveContainer>

                            </div>
                            {/* <div className={ bgColours[theme] + ` text-white px-2 md:px-4 py-2 rounded-lg absolute top-[2rem] -z-[0] max-md:-right-5 -right-[0.7rem] md:w-[6.5rem] w-[5rem] ${blur ? "opacity-25" : "opacity-100"} duration-200 flex items-center justify-center`}>
                            {Number(lastPrice2).toLocaleString()}
                        </div> */}
                        </div>

                    </div>
                    :
                    <div className=" w-full h-[500px] bg-white p-4 relative flex gap-2 mt-10">
                    <div className='h-[500px] w-full relative'>

                        <div className={`relative w-full max-md:w-[110%] h-full`}>

                            <div id="border" className={` absolute xl:-left-[1.8rem] -left-8 max-md:w-full ${fullscreenMode ? "max-lg:w-[88%] max-xl:w-[90.5%] xl:w-[91.3%] max-[1440px]:w-[94%] min-[1440px]:w-[92.3%] min-[1550px]:w-[92.5%] min-[1700px]:w-[94.6%] min-[2100px]:w-[95.9%]" : "max-lg:w-[87.5%] max-xl:w-[90%] xl:w-[90.8%] max-[1440px]:w-[93.5%] min-[1440px]:w-[91.5%] min-[1550px]:w-[92%] min-[1700px]:w-[94%] min-[2100px]:w-[95.3%]"} h-full -translate-y-10 grid grid-flow-col grid-cols-6 inset-0 border-x-[1px] border-b-[1px] border-gray-100 pointer-events-none m-10`}>
                                <div className='border-x-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                                <div className='border-r-[0.5px] border-gray-200'></div>
                            </div>

                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart
                                    data={dataset}
                                    margin={{ top: 10, right: 80, bottom: 10, left: 10 }}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <XAxis dataKey="Time" hide />
                                    <YAxis yAxisId="left" hide domain={[0,btcDomain]} />
                                    <YAxis yAxisId="right" orientation="right" domain={[0, domain]} hide />
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="30%" stopColor={colours[theme]} stopOpacity={0.07} />
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
                                    <Tooltip content={<CustomLabel pair={"1"} />} />
                                    <Area
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="Price"
                                        stroke={colours[theme]}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorUv)"
                                    />

                                    <ReferenceLine yAxisId="left" y={Number(lastPrice)} opacity={0} className='z-10'>
                                        <Label content={<CustomReferenceLineLabel2 value={Number(lastPrice)} color={colours[theme]} viewBox={{}} />} position="right" />
                                    </ReferenceLine>

                                    {activeY !== null && (
                                        <ReferenceLine yAxisId="left" y={activeY} stroke="#000000" strokeDasharray="3 3" className='z-10'>
                                            <Label content={<CustomReferenceLineLabel value={activeY} pair={"1"} viewBox={{}} />} position="right" />
                                        </ReferenceLine>
                                    )}
                                </ComposedChart>
                            </ResponsiveContainer>

                        </div>
                        
                    </div>

                </div>
                }

            </div>

        </div>
    )
}
