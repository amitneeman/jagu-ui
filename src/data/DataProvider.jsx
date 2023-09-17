import React, { createContext, useState, useEffect } from "react";
import keywordProductData_file from './keyword_product.json';
import marketShareData_file from './market_share.json';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
    const [keywordProductData, setKeywordProductData] = useState([]);
    const [marketShareData, setMarketShareData] = useState([]);
    const [minWeek, setMinWeek] = useState(1);
    const [maxWeek, setMaxWeek] = useState(31);

    useEffect(() => {
        setTimeout(() => {
            setKeywordProductData(keywordProductData_file);
            marketShareData_file = marketShareData_file.sort((a, b) => a.Week - b.Week)
            setMarketShareData(marketShareData_file);
        }, 2000)
    }, []);

    function filterData(data) {
        return data.filter(a => a.Week >= minWeek && a.Week <= maxWeek);
    }

    return (
        <DataContext.Provider value={{
            keywordProductData: filterData(keywordProductData),
            setKeywordProductData,
            marketShareData: filterData(marketShareData),
            setMarketShareData,
            minWeek,
            setMinWeek,
            maxWeek,
            setMaxWeek
        }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider, DataContext };