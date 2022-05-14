import { Button, Card } from '@mui/material'
import styled from 'styled-components'

export const StyledCard = styled(Card)`
    position: relative;
    margin: auto auto;
    width: 50vw;
    height: min-content;
    margin-top: 10vh;
    padding: 5rem;
    display: grid;
    grid-template-columns: 1fr
`

export const StyledButton = styled(Button)`
    position: relative;
    margin: 2vh 2vw 2vh 2vw;
    pading: 1vh 0 1vh 0;
    width: max-content;
`