import './App.css';
import React, { useContext } from 'react';
import { DataProvider, DataContext } from './data/DataProvider';
import Main from './components/mainScreen/Main';



function App() {


  return (
    <DataProvider>
      <Main/>
    </DataProvider>
  );
}

export default App;


