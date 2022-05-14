import React, { useContext, createContext, useReducer } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { JsonRpcProvider } from "@ethersproject/providers"
import { AppProvider } from './state/Context'
import { Wallet } from './components/Wallet'



import CardComponent from './components/Card';

function App() {


const getLibrary = (provider: any, connector: any) => {
  //@ts-ignore
  const library = new JsonRpcProvider('HTTP://127.0.0.1:8545');
  return library;
};



  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    <div className="App">
      <AppProvider>
        <CardComponent />
        <Wallet />
      </AppProvider>
    </div>
    </Web3ReactProvider>
  );
}

export default App;
