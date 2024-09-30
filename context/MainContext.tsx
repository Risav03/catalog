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
    hoveringPrice: number;
    setHoveringPrice: Dispatch<SetStateAction<number>>;
    communityPos: string;
    setCommunityPos: Dispatch<SetStateAction<string>>;
    communityNeg: string;
    setCommunityNeg: Dispatch<SetStateAction<string>>;
    type: string;
    setType: Dispatch<SetStateAction<string>>;
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
    hoveringPrice: 0,
    setHoveringPrice: () => {},
    type: "",
    setType: () => {},
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
    const[yearlyChange, setYearlyChange] = useState<string>("");

    const[hoveringPrice, setHoveringPrice] = useState<number>(0)

    const[totalSupply, setTotalSupply] = useState<string>("");

    const[theme, setTheme] = useState<number>(0);

    const[type, setType] = useState<string>("USD");

    // ... rest of the code remains the same ...

  return (
    <GlobalContext.Provider value={{ 
      marketCap, setMarketCap, 
      hoveringPrice, setHoveringPrice, 
      communityPos, setCommunityPos, 
      communityNeg, setCommunityNeg, 
      theme, setTheme, 
      marketCapPercent, setMarketCapPercent, 
      ath, setAth, 
      atl, setAtl, 
      circulatingSupply, setCirculatingSupply, 
      dailyLow, setDailyLow, 
      dailyChange, setDailyChange, 
      dailyHigh, setDailyHigh, 
      weeklyChange, setWeeklyChange, 
      monthlyChange, setMonthlyChange, 
      yearlyChange, setYearlyChange, 
      totalSupply, setTotalSupply, 
      volume, setVolume, 
      athDate, setAthDate, 
      atlDate, setAtlDate, 
      athPercent, setAthPercent, 
      atlPercent, setAtlPercent,
      type, setType
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);