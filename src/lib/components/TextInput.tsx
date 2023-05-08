import styled from "styled-components";
import React, {useEffect} from "react";
import {useTranslations} from "../hooks";

type InputProps = {
    hasError?: boolean
}

type TextInputProps = {
    disabled?: boolean,
    autoFocus?: boolean
    value?: string,
    onChangeText?(text: string): void,
    hasError?: boolean
}
export const TextInput: React.FunctionComponent<TextInputProps> = ({
    disabled,
    autoFocus,
    value,
    onChangeText,
    hasError
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
            hasError={hasError}
        />
    )
}

const Input = styled.textarea<InputProps>`
    background-color: ${({theme}) => theme.colors.input};
    color: ${({theme}) => theme.colors.typography};
    border: ${({theme, hasError}) => hasError ? `1px solid ${theme.colors.error}` : 'none' };
    border-radius: 8px;
    height: 300px;
    width: 400px;
    resize: none;
    font-size: 18px;
    padding: 10px 15px;
`
