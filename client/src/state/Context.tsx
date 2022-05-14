import { createContext, useReducer } from 'react'
import { web3 } from '../constants/index'


export const initialState = {    
    account: '0x',
};



export type AppState = {
    account: any;
}

type ACTIONTYPE =
  | { type: "CONNECT"; payload: AppState }
  | { type: "DISCONNECT"; payload: AppState }


function reducer(state: AppState, action: ACTIONTYPE) {
    switch (action.type) {
        case "CONNECT":
          return {
            //@ts-ignore
            account: window.ethereum.accounts[0]
          }                
         case "DISCONNECT":
          return initialState
        default:
          return state
      }
}



const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<ACTIONTYPE>;
}>({state: initialState, dispatch: () => {} })

export function AppProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext }