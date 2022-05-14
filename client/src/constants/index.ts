import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'

export const web3 = new Web3('http://localhost:8545')
export const injected = new InjectedConnector({supportedChainIds: [1337, 8545, 7545]})
