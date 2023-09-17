import React, { useContext,useState } from "react";
import styled from 'styled-components';
import { DataContext } from "../../data/DataProvider";
import MarketShare from "./MarketShare";
import MarketPerformance from "./MarketPerformance";
import ReactSlider from "react-slider";

const Container = styled.div`
height: 60%;
`
const SliderContainer = styled.div`
    height: 5%;
    display: flex;
    justify-content: center;
`
const GraphsContainer = styled.div`
  border: 2px solid black;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: stretch;
`;

const StyledSlider = styled(ReactSlider)`
    width: 20%;
    height: 25px;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => (props.index === 2 ? '#f00' : props.index === 1 ? '#0f0' : '#ddd')};
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;


function MarketViewSection() {
    const { marketShareData,minWeek, setMinWeek,maxWeek, setMaxWeek} = useContext(DataContext);
    
    function setLimits(limits){
        setMinWeek(limits[0])
        setMaxWeek(limits[1])
    }
    function filterData(){
        return marketShareData.filter(a => a.Week >= minWeek && a.Week <= maxWeek)
    }

    return (
        <Container>
            <SliderContainer>
                <StyledSlider
                    max={31}
                    min={1}
                    defaultValue={[1, 31]}
                    renderThumb={Thumb}
                    enderTrack={Track}
                    pearling
                    minDistance={1}
                    onAfterChange={setLimits}
                />
            </SliderContainer>
            <GraphsContainer>
                <MarketShare marketShareData={marketShareData} />
                <MarketPerformance marketShareData={marketShareData} />
            </GraphsContainer>
        </Container>
    );
}

export default MarketViewSection;
