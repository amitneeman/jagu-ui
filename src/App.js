import './App.css';
import AlertsSection from './components/alerts/AlertsSection';
import MarketViewSection from './components/marketView/MarketViewSection';
import styled from 'styled-components';

// Define a styled component for the square
const AppContainer = styled.div`
height: 100vh;
width: 100%;
`;

function App() {
  return (
    <AppContainer>
      <header>
        Jagu
      </header>
      <MarketViewSection/>
      <AlertsSection/>
    </AppContainer>
  );
}

export default App;
