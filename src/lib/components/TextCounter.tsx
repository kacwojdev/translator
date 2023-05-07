import styled from "styled-components";
import React from "react";

type CounterProps = {
    counter: number,
    limit: number
}
export const TextCounter:React.FunctionComponent<CounterProps> = ({
    counter,
    limit
}) => (
    <Counter>
        {counter}/{limit}
    </Counter>
)

const Counter = styled.div`
  color: ${({theme}) => theme.colors.typography};
`
