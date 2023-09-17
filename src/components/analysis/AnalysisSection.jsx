import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { DataContext } from "../../data/DataProvider";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Define a styled component for the square
const Container = styled.div`
  height: 35%;
  width: 100%;
  overflow: hidden;
`;

function AnalysisSection() {
    const { keywordProductData, maxWeek } = useContext(DataContext);

    function buildData() {
        let weekDifference = []
        let previousWeekData = keywordProductData.filter(e => e.Week === `${maxWeek - 1}`);
        let latestWeekData = keywordProductData.filter(e => e.Week === `${maxWeek}`);
        for (let searchData of previousWeekData) {
            let keywordLast = searchData['Search Query'];
            let searchDataLatest = latestWeekData.filter(e => e['Search Query'] === keywordLast);
            if (searchDataLatest.length === 0) {
                searchDataLatest.push({
                    "Search Query": keywordLast,
                    "Search Query Volume": 0,
                    "Impressions: Total Count": 0,
                    "Impressions: Brand Count": 0,
                    "Impressions: Brand Share %": 0,
                    "Clicks: Total Count": 0,
                    "Clicks: Click Rate %": 0,
                    "Clicks: Brand Count": 0,
                    "Clicks: Brand Share %": 0,
                    "Cart Adds: Total Count": 0,
                    "Cart Adds: Cart Add Rate %": 0,
                    "Cart Adds: Brand Count": 0,
                    "Cart Adds: Brand Share %": 0,
                    "Purchases: Total Count": 0,
                    "Purchases: Purchase Rate %": 0,
                    "Purchases: Brand Count": 0,
                    "Purchases: Brand Share %": 0,
                })
            }
            searchDataLatest = searchDataLatest[0];

            let yourDiff = searchDataLatest["Purchases: Brand Count"] - searchData["Purchases: Brand Count"];
            let marketDiff = searchDataLatest["Purchases: Total Count"] - searchData["Purchases: Total Count"];
            
            let marketShareDiff = (searchDataLatest["Purchases: Brand Count"] / (searchDataLatest["Purchases: Total Count"] + 0.01)) - (searchData["Purchases: Brand Count"] / (searchData["Purchases: Total Count"] + 0.01)) 
                
            weekDifference.push({
                keyword: keywordLast,
                yourLastWeekSales: searchData["Purchases: Brand Count"],
                marketLastWeekSales: searchData["Purchases: Total Count"],
                yourLatestWeekSales: searchDataLatest["Purchases: Brand Count"],
                marketLatestWeekSales: searchDataLatest["Purchases: Total Count"],
                yourDiff: yourDiff,
                marketDiff: marketDiff,
                advantage: yourDiff - marketDiff,
                marketShareDiff: marketShareDiff * 100
            })
        }

        return weekDifference;
    }
    return (
        <Container>
            <AgGridReact
                rowData={buildData()}
                columnDefs={[
                    { field: 'keyword',},
                    { field: 'yourLastWeekSales',headerName: `Brand Week ${maxWeek -1} sales` },
                    { field: 'yourLatestWeekSales',headerName: `Brand Week ${maxWeek} sales` },
                    { field: 'marketLastWeekSales',headerName: `Market Week ${maxWeek -1} sales`},
                    { field: 'marketLatestWeekSales',headerName: `Market Week ${maxWeek} sales` },
                    { field: 'yourDiff' },
                    { field: 'marketDiff' },
                    { field: 'advantage' },
                    { field: 'marketShareDiff' },
                ]} // Column Defs for Columns
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows,
                defaultColDef={{
                    sortable: true
                }}
            />
        </Container>
    )
}

export default AnalysisSection;
