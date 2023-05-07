import React from "react";
import {useTranslations} from "../hooks";
import styled from "styled-components";

type MessageProps = {
    message: string,
    withButton?: boolean,
    onClick?(): void
}
export const Message: React.FunctionComponent<MessageProps> = ({
    message,
    withButton,
    onClick
}) => {
    const T = useTranslations()

    return (
        <MessageContainer>
            <Text>
                {message}
            </Text>
            {withButton && (
                <Button
                    onClick={onClick}
                >
                    {T.components.message.tryAgain}
                </Button>
            )}
        </MessageContainer>
    )
}

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    background-color: ${({theme}) => theme.colors.primary};
    padding: 10px 5px;
    border: none;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
`

const Text = styled.p`
    color: ${({theme}) => theme.colors.typography};
`
