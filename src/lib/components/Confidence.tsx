import styled from "styled-components";
import React, {useCallback} from "react";
import {AutoDetectedLanguage, LanguageCode} from "../models";
import {useTranslations} from "../hooks";

type LanguageProps = {
    disabled: boolean
}

type ConfidenceProps = {
    autoDetectedLanguage: AutoDetectedLanguage,
    onClick(): void,
    hasError: boolean,
}
export const Confidence: React.FunctionComponent<ConfidenceProps> = ({
    autoDetectedLanguage = {},
    hasError,
    onClick
}) => {
    const T = useTranslations()
    const { confidence, language } = autoDetectedLanguage
    const getDetectedLanguage = useCallback(() => {
        if (!language) return undefined

        const [detectedLanguage] = Object
            .entries(LanguageCode)
            .filter(([,languageCode]) => language === languageCode) || []


        return detectedLanguage
            ? `(${detectedLanguage[0]})`
            : undefined
    }, [language])

    return (
        <Container>
            <Percentage>
                {confidence && `${confidence}%`}
            </Percentage>
            <Language
                onClick={() => {
                    if (!hasError) {
                        onClick()
                    }
                }}
                disabled={hasError}
            >
                {hasError && T.components.confidence.error}
                {language && getDetectedLanguage()}
            </Language>
        </Container>
    )
}

const Container = styled.div``

const Percentage = styled.span`
    color: ${({theme}) => theme.colors.primary};
`

const Language = styled.a<LanguageProps>`
    cursor: ${({disabled}) => disabled ? undefined : 'pointer'};
    text-decoration: ${({disabled}) => disabled ? undefined : 'underline'};
    margin-left: 5px;
    color: ${({theme, disabled}) => disabled ? theme.colors.error : theme.colors.primary};
`
