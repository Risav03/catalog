"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalContextType = {
    marketCap: string;
    setMarketCap: Dispatch<SetStateAction<string>>;
    marketCapPercent: string;
    setMarketCapPercent: Dispatch<SetStateAction<string>>;
    ath: string;
    setAth: Dispatch<SetStateAction<string>>;
    atl: string;
    setAtl: Dispatch<SetStateAction<string>>;
    circulatingSupply: string;
    setCirculatingSupply: Dispatch<SetStateAction<string>>;
    dailyLow: string;
    setDailyLow: Dispatch<SetStateAction<string>>;
    dailyHigh: string;
    setDailyHigh: Dispatch<SetStateAction<string>>;
    dailyChange: string;
    setDailyChange: Dispatch<SetStateAction<string>>;
    weeklyChange: string;
    setWeeklyChange: Dispatch<SetStateAction<string>>;
    monthlyChange: string;
    setMonthlyChange: Dispatch<SetStateAction<string>>;
    yearlyChange: string;
    setYearlyChange: Dispatch<SetStateAction<string>>;
    totalSupply: string;
    setTotalSupply: Dispatch<SetStateAction<string>>;
    volume: string;
    setVolume: Dispatch<SetStateAction<string>>;
    athDate: string;
    setAthDate: Dispatch<SetStateAction<string>>;
    athPercent: string;
    setAthPercent: Dispatch<SetStateAction<string>>;
    atlDate: string;
    setAtlDate: Dispatch<SetStateAction<string>>;
    atlPercent: string;
    setAtlPercent: Dispatch<SetStateAction<string>>;
    theme: number;
    setTheme: Dispatch<SetStateAction<number>>;
    communityPos: string;
    setCommunityPos: Dispatch<SetStateAction<string>>;
    communityNeg: string;
    setCommunityNeg: Dispatch<SetStateAction<string>>;
  };
  
  const GlobalContext = createContext<GlobalContextType>({
    marketCap: "",
    setMarketCap: () => {},
    marketCapPercent: "",
    setMarketCapPercent: () => {},
    ath: "",
    setAth: () => {},
    atl: "",
    setAtl: () => {},
    circulatingSupply: "",
    setCirculatingSupply: () => {},
    dailyLow: "",
    setDailyLow: () => {},
    dailyHigh: "",
    setDailyHigh: () => {},
    dailyChange: "",
    setDailyChange: () => {},
    weeklyChange: "",
    setWeeklyChange: () => {},
    monthlyChange: "",
    setMonthlyChange: () => {},
    yearlyChange: "",
    setYearlyChange: () => {},
    totalSupply: "",
    setTotalSupply: () => {},
    volume: "",
    setVolume: () => {},
    athDate: "",
    setAthDate: () => {},
    atlDate: "",
    setAtlDate: () => {},
    athPercent: "",
    setAthPercent: () => {},
    atlPercent: "",
    setAtlPercent: () => {},
    communityPos: "",
    setCommunityPos: () => {},
    communityNeg: "",
    setCommunityNeg: () => {},
    theme: 0,
    setTheme: () => {},
  });


export const GlobalContextProvider = ({ children }:{children:ReactNode}) => {
  
    const[marketCap, setMarketCap] = useState<string>("")
    const[marketCapPercent, setMarketCapPercent] = useState<string>("")

    const[ath, setAth] = useState<string>("")
    const[athPercent, setAthPercent] = useState<string>("")
    const[athDate, setAthDate] = useState<string>("")

    const[atl, setAtl] = useState<string>("")
    const[atlDate, setAtlDate] = useState<string>("")
    const[atlPercent, setAtlPercent] = useState<string>("")

    const[circulatingSupply, setCirculatingSupply] = useState<string>("")
    const[dailyLow, setDailyLow] = useState<string>("")
    const[dailyHigh, setDailyHigh] = useState<string>("")

    const[communityPos, setCommunityPos] = useState<string>("")
    const[communityNeg, setCommunityNeg] = useState<string>("")


    const[volume, setVolume] = useState<string>("")

    const[dailyChange, setDailyChange] = useState<string>("")
    const[weeklyChange, setWeeklyChange] = useState<string>("")
    const[monthlyChange, setMonthlyChange] = useState<string>("")
    const[yearlyChange, setYearlyChange] = useState<string>("")

    const[totalSupply, setTotalSupply] = useState<string>("");

    const[theme, setTheme] = useState<number>(0);



    async function fetchLiveData(){
        try{
            const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
            
            const jsonRes = await res.json();

            setMarketCap(`$${(jsonRes.market_data.market_cap.usd).toLocaleString()}`);
            setMarketCapPercent(`${(jsonRes.market_data.market_cap_change_percentage_24h.toFixed(2))}%`);

            setAth(`$${(jsonRes.market_data.ath.usd).toLocaleString()}`);
            setAtl(`$${(jsonRes.market_data.atl.usd).toLocaleString()}`);
            setAthDate(`${(new Date(jsonRes.market_data.ath_date.btc)).getDate()}/${(new Date(jsonRes.market_data.ath_date.btc)).getMonth()+1}/${(new Date(jsonRes.market_data.ath_date.btc)).getFullYear()}`)
            setAtlDate(`${(new Date(jsonRes.market_data.atl_date.btc)).getDate()}/${(new Date(jsonRes.market_data.atl_date.btc)).getMonth()+1}/${(new Date(jsonRes.market_data.atl_date.btc)).getFullYear()}`)
            setCirculatingSupply(`${jsonRes.market_data.circulating_supply.toLocaleString()} BTC`)

            setAthPercent(`${jsonRes.market_data.ath_change_percentage.usd.toFixed(2)}%`)
            setAtlPercent(`${jsonRes.market_data.atl_change_percentage.usd.toFixed(2)}%`)

            setDailyChange(`${jsonRes.market_data.price_change_percentage_24h.toFixed(2)}%`)
            setWeeklyChange(`${jsonRes.market_data.price_change_percentage_7d.toFixed(2)}%`)
            setMonthlyChange(`${jsonRes.market_data.price_change_percentage_30d.toFixed(2)}%`)
            setYearlyChange(`${jsonRes.market_data.price_change_percentage_1y.toFixed(2)}%`)

            setVolume(`$${jsonRes.market_data.total_volume.usd.toLocaleString()}`);

            setDailyHigh(`$${jsonRes.market_data.high_24h.usd.toLocaleString()}`);
            setDailyLow(`$${jsonRes.market_data.low_24h.usd.toLocaleString()}`);

            setCommunityPos(`${jsonRes.sentiment_votes_up_percentage}%`);
            setCommunityNeg(`${jsonRes.sentiment_votes_down_percentage}%`)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
      var theme = localStorage.getItem('theme');

      if(theme == ""){
        localStorage.setItem('theme', '0');
        theme = '0';
      }

      setTheme(Number(theme));

    },[])

    useEffect(()=>{
      localStorage.setItem('theme', String(theme));
    },[theme])
    
    useEffect(()=>{
        fetchLiveData();
    },[])

  return (
    <GlobalContext.Provider value={{ marketCap, setMarketCap, communityPos, setCommunityPos, communityNeg, setCommunityNeg, theme, setTheme, marketCapPercent, setMarketCapPercent, ath, setAth, atl, setAtl, circulatingSupply, setCirculatingSupply, dailyLow, setDailyLow, dailyChange, setDailyChange, dailyHigh, setDailyHigh, weeklyChange, setWeeklyChange, monthlyChange, setMonthlyChange, yearlyChange, setYearlyChange, totalSupply, setTotalSupply, volume, setVolume, athDate, setAthDate, atlDate, setAtlDate, athPercent, setAthPercent, atlPercent, setAtlPercent}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
