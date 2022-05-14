import { connect, disconnect } from '../contractFunctions'
import styled from 'styled-components'
import { StyledButton} from '../styled'
import { injected } from '../constants'
import { useWeb3React } from '@web3-react/core'

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 3vw;
    margin: 2vh auto;
    width: 10vw;
`

export const Wallet = () => {

    const { activate, active } = useWeb3React()

    return(
        <StyledWrapper>
            <StyledButton disabled={active} onClick={() => {
                connect(activate, injected)
            }}>Connect</StyledButton>
            <StyledButton disabled={!active} onClick={() => {
                disconnect(activate, injected)
            }}>Disconect</StyledButton>        
        </StyledWrapper>
    )
}