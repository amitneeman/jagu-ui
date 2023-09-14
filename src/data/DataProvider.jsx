import React, { createContext, useState,useEffect } from "react";
import keywordProductData_file from './keyword_product.json';
import marketShareData_file from './market_share.json';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
    const [keywordProductData, setKeywordProductData] = useState([]);
    const [marketShareData, setMarketShareData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
        setKeywordProductData(keywordProductData_file);
        marketShareData_file = marketShareData_file.sort((a, b) => a.Week - b.Week)
        setMarketShareData(marketShareData_file);
        },2000)
    }, []);

    return (
        <DataContext.Provider value={{keywordProductData, setKeywordProductData,marketShareData, setMarketShareData}}>
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider, DataContext };