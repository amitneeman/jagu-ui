import React, { useContext, useState } from "react";
import styled from 'styled-components';
import AlertList from "./AlertList";
import { DataContext } from "../../data/DataProvider";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


// Define a styled component for the square
const Container = styled.div`
  height: 35%;
  width: 100%;
  overflow: auto;
`;

function AlertsSection() {
    const { keywordProductData } = useContext(DataContext);

    function buildChanges() {

        const lastestWeek = keywordProductData.reduce((max, obj) => {
            if (Number(obj.Week) > max) {
                return Number(obj.Week);
            } else {
                return max;
            }
        }, -Infinity);

        const filteredData = keywordProductData.filter((item) => {
            const weekbefore = keywordProductData.some((record) => record['Search Query'] === item['Search Query'] && Number(record.Week) === lastestWeek - 1 && record['Purchases: Total Count'] > 10);
            const currweek = keywordProductData.some((record) => record['Search Query'] === item['Search Query'] && Number(record.Week) === lastestWeek);
            return weekbefore && currweek;
        }).filter(e => Number(e.Week) === lastestWeek || Number(e.Week) === lastestWeek - 1)

        let diffs = []

        for (let word of [...new Set(filteredData.map(item => item['Search Query']))]) {
            let docs = filteredData.filter(e => e['Search Query'] === word);
            let latest = docs.filter(e => Number(e.Week) === lastestWeek)[0]["Purchases: Brand Share %"]
            let before = docs.filter(e => Number(e.Week) === lastestWeek - 1)[0]["Purchases: Brand Share %"]
            diffs.push({
                'Search Query': word,
                'Start': before,
                'Now': latest,
                'Change': latest - before
            })
        }

        return diffs.sort((a, b) => b.Change - a.Change);
        ;
    }

    const diffs = buildChanges();
    console.log(diffs);

    return (
        <Container>
            <Tabs>
                <TabList>
                    <Tab>Top Gainers 📈</Tab>
                    <Tab>Top Losers 📉</Tab>
                </TabList>
                <TabPanel>
                    <AlertList data={diffs.slice(0,5)}/>
                </TabPanel>
                <TabPanel>
                    <AlertList data={diffs.slice( diffs.length - 5,diffs.length)}/>
                </TabPanel>
            </Tabs>
        </Container>
    );
}

export default AlertsSection;
