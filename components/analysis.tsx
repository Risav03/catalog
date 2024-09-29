"use client"
import { useGlobalContext } from '@/context/MainContext'
import React from 'react'

export const Analysis = () => {

    const {communityPos, communityNeg} = useGlobalContext()

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
    },
    {
        headline:"$99,000 to $100,000 Bitcoin ATH Price Prediction Emerges as BTC Prepares to Break",
        subhead: "Bitcoin hovers just under the $66,000 price and could break major resistance level soon. BTC price could set a high ATH or trend high after a 51% surge to $99,000 -",
        link: "https://cryptonewsland.com/99000-to-100000-bitcoin-btc-ath/"
    },
    {
        headline:"Bitcoin Price Nears $66K: Rally or Bull Trap?",
        subhead:"Bitcoin is on the move! After months of steady consolidation, its price could break out and soar to",
        link: "https://coinmarketcap.com/community/en/articles/66f8ef14b8e4a634befe72cd"
    },
    {
        headline:"JASMY Chart Hints at New Higher Highs as Analyst Expects Big Pump for JASMY Being",
        subhead:"Bitcoin (BTC) price prepares to take the $66,000 mark with $68,000 as major resistance. JAsmyCoin price chart",
        link: "https://cryptonewsland.com/jasmy-chart-hints-big-pump-jasmy/"
    }

    ]

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

        <h2 className='text-xl mt-10 mb-5'>Latest News</h2>
        <div className='flex flex-wrap items-center gap-4 w-full justify-center'>
            {data.map((item)=>(
                <div className='bg-gray-100 rounded-lg w-80 h-60 p-2'>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-gray-200 rounded-full h-12 w-12'></div>
                        <h2 className='w-[80%] text-lg font-semibold'>{item.headline.substring(0,50)}{item.headline.length>50 && "..."}</h2>
                    </div>
                    <div className='my-2'>
                        <p>{item.subhead.substring(0,75)}{item.subhead.length>75 && "..."}</p>
                        <a href={item.link} target='_blank' className='group flex items-center justify-center relative' >
                            <h2 className='text-btc-disabled group-hover:opacity-100 opacity-0 duration-200 absolute'>Go to link</h2>
                            <div className='bg-gray-200 hover:bg-gray-300 duration-200 cursor-pointer rounded-lg h-28 w-full'></div>
                        </a>
                    </div>
                </div>
            ))}
        </div>  
    </div>
  )
}
