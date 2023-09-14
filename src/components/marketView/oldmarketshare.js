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
border: solid;
height: 100%;
width: 50%;
`



function MarketShare({ marketShareData }) {

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Purchases - You vs Market',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };


    const labels = marketShareData.map(d => `Week-${d.Week}`)
    const marketData = marketShareData.map(d => d['Purchases: Total Count'])
    const userData = marketShareData.map(d => d['Purchases: Brand Count'])


    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'User',
                data: userData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.6)',
                tension: 0.4,
                yAxisID: 'y1'
            },
            {
                fill: true,
                label: 'Market',
                data: marketData,
                borderColor: 'rgb(220,20,60)',
                backgroundColor: 'rgb(255,160,122,0.5)',
                tension: 0.4,
                yAxisID: 'y'
            },
        ],
    };


    return (
        <Container>
            <Line options={options} data={data} />
        </Container>
    )
}

export default MarketShare;


