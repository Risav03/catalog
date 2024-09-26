"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import btc from "@/assets/bitcoin.png"
import { CiGlobe } from "react-icons/ci";
import { IoIosDocument } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";


export const Summary = () => {

    const [marketCap, setMarketCap] = useState<number>(0)

    return (
        <div className='mt-10 px-20'>
            <div className='flex gap-2 items-center justify-start'>
                <Image src={btc} alt='btc' className='rounded-full w-10' />
                <h2 className='font-bold text-2xl'>Bitcoin (BTC)</h2>
            </div>
            <div className='w-full bg-gray-100 flex gap-2 max-md:flex-col justify-end rounded-xl mt-5 p-4'>
                <div>

                </div>
                <div className='bg-gray-200 rounded-lg w-64 h-80 flex flex-col p-4 gap-6'>
                    <div>
                        <h2 className='text-xl text-gray-600'>Market Cap</h2>
                        <h2 className='font-semibold'>$1.28T</h2>
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
