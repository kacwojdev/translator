import styled from 'styled-components'
import {Confidence, ExchangeLanguage, Loader, SelectLanguage, TextCounter, TextInput} from 'lib/components'
import React, {useState, useEffect} from "react";
import {useSupportedLanguages} from "./useSupportedLanguages.ts";
import { Language } from 'lib/models'
import { Message } from "lib/components";
import {useTranslations} from "../../lib/hooks";

export const TranslatorScreen: React.FunctionComponent = () => {
    const T = useTranslations()
    const [languages, setLanguages] = useState<Array<Language>>()
    const {loading, error, fetch: getSupportedLanguages } = useSupportedLanguages(
        languages => console.log(languages)
    )

    useEffect(() => {
        getSupportedLanguages()
    }, [])

    if (loading) {
        return (
            <Container>
                <Loader />
            </Container>
        )
    }

    if (error) {
        return (
            <CenterContainer>
                <Message
                    withButton
                    message={T.components.message.errorSomethingWentWrong}
                    onClick={() => getSupportedLanguages()}
                />
            </CenterContainer>
        )
    }

    if (languages?.length === 0) {
        return (
            <CenterContainer>
                <Message message={T.components.message.errorNoSupportedLanguage} />
            </CenterContainer>
        )
    }

    return (
        <Container>
            <TranslatorContainer>
                <InputContainer>
                    <SelectLanguage />
                    <TextInput />
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                    <InputFooter>
                        <Confidence />
                        <TextCounter />
                    </InputFooter>
                </InputContainer>
                <ExchangeLanguage />
                <InputContainer>
                    <SelectLanguage />
                    <TextInput />
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                </InputContainer>
            </TranslatorContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    color: ${({theme}) => theme.colors.typography};
`

const TranslatorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 5px;
`

const LoaderContainer = styled.div`
    padding: 5px 10px;
`

const InputFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
