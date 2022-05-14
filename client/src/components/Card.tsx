import { useState, useContext, useEffect } from 'react'
import {  Typography, TextField, CardHeader 
} from '@mui/material'
import styled from 'styled-components'
import { AppContext, initialState } from '../state/Context'
import { useWeb3React } from '@web3-react/core'
import { StyledCard, StyledButton } from '../styled/index'
import { addressesType, valuesType } from '../types'
import { getBalance, getAddressStatus, getRemainingValidations, 
  validateAddress, unvalidateAddress, addAllowance,
  removeAllowance, withdrawMoney, getAddressAllowance,
  getPastValidation, 
  getValidationChanges} from '../contractFunctions/index'



    const CardComponent = () => {

    const StyledDiv = styled.div`
      margin: 5vh 0 5vh 0;
    `
    
    type events = {
      pastValidation: any
      validationIncreased: any
    }

    const { state, dispatch } = useContext(AppContext)
    const { active, account, activate, deactivate} = useWeb3React()
    const [ allowance, setAllowance] = useState<any>('')
    const [ values, setValues] = useState<valuesType>({amount: '0', address: '0x'})
    const [ events, setEvents ] = useState<events>({pastValidation: [], validationIncreased: []})
    const [ addressInfo, setAddressInfo ] = useState<addressesType>({balance: '0', addressStatus: false, remainingValidations: '0'})

    useEffect(() => {
      getBalance().then((res) => {
        setAddressInfo({balance: res, addressStatus: addressInfo.addressStatus, remainingValidations: addressInfo.remainingValidations})
      })
    }, [values.address !== '0x'])

    useEffect(() => {
      getAddressAllowance(values.address).then((res) => {
        setAllowance(res)
      })
    }, [values.address !== '0x'])
    
      const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e?.target.name]: e?.target.value })
      }

      console.log(values.address)

      useEffect(() => {
        getPastValidation().then((res) => {
          setEvents({pastValidation: res, validationIncreased: events.validationIncreased})
        })
      }, [])

      useEffect(() => {
        getValidationChanges().then((res) => {
          setEvents({pastValidation: events.pastValidation, validationIncreased: res})
        })
      }, [])

      console.log(events)


    return(<>
        <StyledCard>
            {/*<Typography>My wallet</Typography>
            <Typography>Account: {account}</Typography>
            <Typography>Wallet balance: {addressInfo.balance}</Typography>
            <Typography>Address status: {addressInfo.addressStatus === true ? 'Elegible' : 'Not elegible'}</Typography>
    <TextField id="amount" name="amount" label="Amount" value={values.amount} onChange={inputChange} variant="outlined" />*/}
            <StyledDiv><Typography>Address allowance: {allowance}</Typography></StyledDiv>
            <TextField id="allowance" name="allowance" label="Allowance" onChange={inputChange} variant="outlined" />
            <StyledButton disabled={!active} onClick={() => {addAllowance(values.address, values.amount, account)}}>Add allowance</StyledButton>
            <StyledButton disabled={!active} onClick={() => {removeAllowance(values.address, values.amount, account)}}>Remove allowance</StyledButton>
            <StyledDiv>
              <TextField id="address" name="address" label="Address" value={values.address} onChange={inputChange} variant="outlined" />
              <StyledButton disabled={!active} onClick={() => {validateAddress(values.address, account)}}>Validate address</StyledButton>
              <StyledButton disabled={!active} onClick={() => {unvalidateAddress(values.address, account)}}>Unvalidate address</StyledButton>            
            </StyledDiv>
            <StyledDiv>
              
            </StyledDiv> 
       </StyledCard>
    </>)
}

export default CardComponent;