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



function MarketShare({ marketShareData }) {
    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Market Share',
            },
        },
    };


    const labels = marketShareData.map(d => `Week-${d.Week}`)
    const marketShare = marketShareData.map(d => Number(d['Purchases Share']) * 100)


    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Market Share %',
                data: marketShare,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0)',
                tension: 0.4,
            }
        ],
    };


    return (
        <Container>
            <Line options={options} data={data} />
        </Container>
    )
}

export default MarketShare;


