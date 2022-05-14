import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Typography } from '@mui/material'
import { StyledCard, StyledButton } from '../styled'
import { getBalance, getAddressStatus, getRemainingValidations, 
    validateAddress, unvalidateAddress, addAllowance,
    removeAllowance, withdrawMoney, getAddressAllowance } from '../contractFunctions/index'
import { addressesType, valuesType } from '../types'



const Painel = () => {

    const { account, active } = useWeb3React()
    const [ validation, setValidation ] = useState<any>({status: false, remainingValidation: '0'})
    const [ values, setValues] = useState<valuesType>({amount: '0', address: '0x'})

    useEffect(() => {
        getAddressStatus(account).then((res) => {
          setValidation({status: res, remainingValidations: validation.remainingValidations})
        })
      }, [active])
      
      useEffect(() => {
        getRemainingValidations(account).then((res) => {
            setValidation({satus:validation.status, remainingValidations: res})
        })
      }, [active])



    return(<>
        <StyledCard>
            <Typography>Address status: {validation.status === true ? 'Valid address' : 'Invalid address'}</Typography>
            <Typography></Typography>
        </StyledCard>
    </>)
}