import { web3 } from '../constants/index'
import { AbiItem  } from 'web3-utils'
import abi from '../contracts/Multisigned.json'
import abi as allowance from '../contracts/Allowance.json'
import { Multisigned, Allowance } from '../contracts/types/web3-v1-contracts/Multisigned'
import { NonPayableTransactionObject } from '../contracts/types/web3-v1-contracts/types'
import accounts from '@web3-react/types'

const multisigned = new web3.eth.Contract(abi.abi as unknown as AbiItem [], '0xf7913E1A3a8311db439ba15A066fC74d94b3d4D7') as any as Multisigned
const allowance = new web3.eth.Contract()
const fromWei = web3.utils.fromWei
export const getBalance = async () => {
    try{ 
        const balance = await multisigned.methods.getBalance().call()
        return fromWei(balance)
    }
    catch (ex){console.log(ex)}
}

export const getAddressAllowance = async (_address: string) => {
    try {
        const addressAllowance = await multisigned.methods.addressAllowance(_address).call()
        return addressAllowance
    } catch (error) {
        console.log(error)
    }
}

export const getAddressStatus = async (_address: any) => {
    try{
        const addressStatus = await multisigned.methods.addressStatus(_address).call()
        return addressStatus       
    }
    catch(ex){
        console.log(ex)
    }
}

export const getRemainingValidations = async (_address: any) => {
    try{
        const remainingValidations = await multisigned.methods.addressRemainingValidation(_address).call()
        return(remainingValidations)
    }
    catch(ex){
        console.log(ex)
    }
}

export const validateAddress = async (_address: string, _wallet: any) => {
    try{
        multisigned.methods.validateAddress(_address).send({from: _wallet})
    }catch(ex){ 
        console.log(ex) 
    }
}

export const unvalidateAddress = async (_address: string, _wallet: any) => {
    try {
        multisigned.methods.unvalidateAddress(_address).send({from: _wallet})
    } catch (error) {
        console.log(error)
    }
}

export const addAllowance = async (_address: string, _amount: any, account: any) => {
    try {
        multisigned.methods.addAllowance(_address, _amount).send({from: account})
    } catch (error) {
        console.log(error)
    }
}

export const removeAllowance = async (_address: string, _amount: any, account: any) => {
    try {
        multisigned.methods.removeAllowance(_address, _amount).send({from: account})
    } catch (error) {
        console.log(error)
    }
}

export const withdrawMoney = async (_address: string, _amount: number) => {
    try {
        multisigned.methods.withdrawMoney(_address, _amount).send()
    } catch (error) {
        
    }
}

export async function connect(activate: any, injected: any) {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

export async function disconnect(deactivate: any, injected: any) {
  try {
    deactivate()
  } catch (ex) {
    console.log(ex)
  }
}

export const getPastValidation = async () => {
    try {
        const addressValidated = await multisigned.getPastEvents('addressValidated')
        return addressValidated
    } catch (error) {
        console.log(error)
    }
}

export const getValidationChanges = async () => {
    try {
        const validationIncreased = await multisigned.getPastEvents('validationIncreased')
        return validationIncreased
    } catch (error) {
        console.log(error)
    }
}

