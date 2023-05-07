import React from "react";
import styled from "styled-components";
import {Images} from "assets";

type ExchangeLanguageProps = {
    hidden: boolean,
    onClick(): void
}
export const ExchangeLanguage:React.FunctionComponent<ExchangeLanguageProps> = ({
    hidden,
    onClick
}) => (
    <ExchangeContainer>
        {!hidden && (<Exchange
            hidden={hidden}
            src={Images.Exchange}
            onClick={onClick}
        />)}
    </ExchangeContainer>
)

const ExchangeContainer = styled.div`
    width: 22px;
    height: 22px;
`

const Exchange = styled.img`
    cursor: pointer;
    width: 22px;
    height: 22px;
`
