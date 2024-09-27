"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import btc from "@/assets/bitcoin.png"
import { CiGlobe } from "react-icons/ci";
import { IoIosDocument } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { useGlobalContext } from '@/context/MainContext';


export const Summary = () => {

    const data = [{
        headline: "Bitcoin analysts say BTC is in a ‘good position’ above the 200-MA and $65K",
        subhead: "Bitcoin finally recaptured the $65,000 level, leading traders to celebrate BTC’s “good” positioning.",
        link: "https://coinmarketcap.com/community/articles/66f5c7b1909fae4b216f4893/"
    },
    {
        headline: "Spot ETFs Contribute to Bitcoin Maturation Process, Reducing Volatility",
        subhead: "Bitcoin’s journey from a highly volatile digital asset to a more stable and mature financial instrument is being",
        link: "https://coinmarketcap.com/community/articles/66f5c5df351b8b6a1c1ef441/"
    },
    {
        headline: "Bitcoin Strengthens as Shiba Coin Surges",
        subhead: "Shiba Coin experienced a remarkable increase today, spurred by Bitcoin‘s robust performance, which saw it",
        link: "https://coinmarketcap.com/community/articles/66f5c552909fae4b216f488c/"
    }

    ]

    const {marketCap} = useGlobalContext()

    return (
        <div className='mt-10 max-md:mt-20 px-20 max-md:px-4 flex flex-col max-md:mx-auto max-md:items-center'>
            <div className='flex gap-2 items-center justify-start'>
                <Image src={btc} alt='btc' className='rounded-full w-10' />
                <h2 className='font-bold text-2xl'>Bitcoin (BTC)</h2>
            </div>
            <div className='w-full max-sm:w-80 max-md:w-[38rem] bg-gray-100 flex gap-4 shadow-xl shadow-black/20 max-md:flex-col justify-end rounded-xl mt-5 p-4'>
                <div className='md:w-[70%]'>
                    <p className='text-lg'>Bitcoin is an alternative form of digital money that is not issued by nation states or corporations and is not controlled by financial intermediaries like banks.</p>
                    <div className='mt-5 w-full'>
                        <h3 className='text-xl'>News</h3>
                        <div className="w-full md:w-auto bg-white h-52 mt-2 rounded-lg shadow-inner shadow-black/20 overflow-x-auto overscroll-x-contain">
                            <div className="flex gap-2 p-5 w-max min-w-full">
                                {data.map((item, index) => (
                                    <div key={index} className="flex-shrink-0 w-[calc(100vw-2.5rem)] md:w-80 h-40 rounded-lg bg-gray-200 p-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                                            <h2 className="w-[calc(100%-3.5rem)] text-sm font-semibold">
                                                {item.headline.length > 45
                                                    ? `${item.headline.substring(0, 45)}...`
                                                    : item.headline}
                                            </h2>
                                        </div>
                                        <p className="mt-2 text-xs mb-4">
                                            {item.subhead.length > 75
                                                ? `${item.subhead.substring(0, 75)}...`
                                                : item.subhead}
                                        </p>
                                        <div className="w-full flex justify-end">
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-black hover:-translate-y-1 duration-200 text-white rounded-md px-2 text-sm py-1"
                                            >
                                                Visit
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-200 rounded-lg w-full md:w-[30%] md:min-w-64 h-80 flex flex-col p-4 gap-6'>
                    <div>
                        <h2 className='text-xl text-gray-600'>Market Cap</h2>
                        <h2 className='font-semibold'>{marketCap}</h2>
                    </div>
                    <div>
                        <h2 className='text-xl text-gray-600'>24Hr Volume</h2>
                        <h2 className='font-semibold'>$35.9B</h2>
                    </div>
                    <div>
                        <h2 className='text-xl text-gray-600'>Circulating Supply</h2>
                        <h2 className='font-semibold'>19.76M BTC</h2>
                    </div>
                    <div>
                        <h2 className='text-xl text-gray-600'>Links</h2>
                        <div className='flex gap-2'>
                            <a className='text-gray-800 text-xl hover:text-gray-600 duration-200' href='https://bitcoin.org/en/' target='_blank' ><CiGlobe /></a>
                            <a className='text-gray-800 text-xl hover:text-gray-600 duration-200' href='https://bitcoin.org/bitcoin.pdf' target='_blank' ><IoIosDocument /></a>
                            <a className='text-gray-800 text-xl hover:text-gray-600 duration-200' href='https://github.com/bitcoin/bitcoin' target='_blank' ><FaGithub /></a>
                            <a className='text-gray-800 text-xl hover:text-gray-600 duration-200' href='https://www.reddit.com/r/Bitcoin/' target='_blank' ><FaReddit /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
