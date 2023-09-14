import AlertsSection from '../alerts/AlertsSection';
import MarketViewSection from '../marketView/MarketViewSection';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { DataContext } from '../../data/DataProvider';
import { Audio } from 'react-loader-spinner'

// Define a styled component for the square
const AppContainer = styled.div`
height: 100vh;
width: 100%;
`;
const Header = styled.div`
background-image: linear-gradient(to right, #00302a , #008549);
height: 5%;
font-size: 18pt;
font-weight: bold;
display: flex;
align-items: center;
color: white;
`;

const Logo = styled.span`
    margin-left: 10px;
`

function Main() {

    const { keywordProductData, marketShareData } = useContext(DataContext);


    function renderApp() {
        if (keywordProductData.length > 0 && marketShareData.length > 0) {
            return ([
                <Header key={1}>
                    <Logo>Jagu </Logo>
                </Header>,
                <MarketViewSection key={2} />,
                <AlertsSection key={3} />
            ]
            )
        } else {
            return (<Audio
                height="300"
                width="300"
                color="#00302a"
                ariaLabel="audio-loading"
                wrapperStyle={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'

                }}
                wrapperClass="wrapper-class"
                visible={true}
            />)
        }
    }

    return (
        <AppContainer>
            {renderApp()}
        </AppContainer>
    );
}

export default Main;


