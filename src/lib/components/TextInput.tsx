import styled from "styled-components";
import React, {useEffect} from "react";
import {useTranslations} from "../hooks";

type TextInputProps = {
    disabled?: boolean,
    autoFocus?: boolean
    value?: string,
    onChangeText?(text: string): void
}
export const TextInput: React.FunctionComponent<TextInputProps> = ({
    disabled,
    autoFocus,
    value,
    onChangeText
}) => {
    const T = useTranslations()
    const inputRef = React.createRef<HTMLTextAreaElement>()
    useEffect(() => {
        if (!disabled && autoFocus && inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <Input
            ref={inputRef}
            disabled={disabled}
            placeholder={disabled ? T.app.disabledTranslatorPlaceholder : T.app.translatorPlaceholder}
            value={value}
            onChange={event => {
                if (onChangeText) {
                    onChangeText(event.target.value)
                }
            }}
        />
    )
}

const Input = styled.textarea`
    background-color: ${({theme}) => theme.colors.input};
    color: ${({theme}) => theme.colors.typography};
    border: none;
    border-radius: 8px;
    height: 300px;
    width: 400px;
    resize: none;
    font-size: 18px;
    padding: 10px 15px;
`
