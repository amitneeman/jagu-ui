import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const Container = styled.div`
border: lightgray solid;
height: 100%;
width: 50%;
`



function MarketPerformance({ marketShareData }) {
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Performance vs Market',
            },
        },
    };

    function normalizeData(weeklyData) {
        let base = weeklyData[0];

        weeklyData = weeklyData.map(e => e * 1/base);

        return weeklyData
    }


    const labels = marketShareData.map(d => `Week-${d.Week}`)
    const marketPerformance = normalizeData(marketShareData.map(d => Number(d['Purchases: Total Count'])))
    const yourPerformance = normalizeData(marketShareData.map(d => Number(d['Purchases: Brand Count'])))


    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'User',
                data: yourPerformance,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0)',                
                tension: 0.4,
            },
            {
                fill: true,
                label: 'Market',
                data: marketPerformance,
                borderColor: 'rgb(220,20,60)',
                backgroundColor: 'rgba(53, 162, 235, 0)',
                tension: 0.4,
            },
        ],
    };


    return (
        <Container>
            <Line options={options} data={data} />
        </Container>
    )
}

export default MarketPerformance;


