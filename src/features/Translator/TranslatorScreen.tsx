import styled from 'styled-components'
import {useDebouncedCallback} from 'use-debounce'
import {Confidence, ExchangeLanguage, Loader, SelectLanguage, TextCounter, TextInput} from 'lib/components'
import React, {useState} from "react";
import {AutoDetectedLanguage, Language, LanguageCode} from 'lib/models'
import {SelectedLanguages} from "./types.ts";
import {APP_CONFIG} from "../../lib/config";
import {useAutoDetectLanguage, useTranslateText} from "./actions.ts";

type TranslatorScreenProps = {
    languages: Array<Language>
}
export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({
    languages
}) => {
    const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguages>({
        source: LanguageCode.Auto,
        target: LanguageCode.Chinese
    })
    const [autoDetectedLanguage, setAutoDetectedLanguage] = useState<AutoDetectedLanguage>()
    const [query, setQuery] = useState<string>('')
    const [translatedText, setTranslatedText] = useState<string>('')
    const {
        loading: loadingDetectingLanguage,
        error: errorDetectingLangauge,
        fetch: autoDetectLanguage
    } = useAutoDetectLanguage(setAutoDetectedLanguage)
    const debounceAction = useDebouncedCallback(
        debouncedQuery => {
            if (debouncedQuery.length < 5) {
                return
            }

            console.log('showing selected langs')
            console.log(selectedLanguages.source, selectedLanguages.target)
            selectedLanguages.source === LanguageCode.Auto
                ? autoDetectLanguage(debouncedQuery)
                : translateText(debouncedQuery, selectedLanguages)
        },
        1000
    )
    const {
        loading: loadingTranslatedText,
        error: errorTranslatedText,
        fetch: translateText
    } = useTranslateText(setTranslatedText)

    return (
        <Container>
            <TranslatorContainer>
                <InputContainer>
                    <SelectLanguage
                        languages={languages}
                        exclude={[selectedLanguages.target]}
                        selectedLanguage={selectedLanguages.source}
                        onChange={newCode => setSelectedLanguages(prevState => ({
                            ...prevState,
                            source: newCode
                        }))}
                    />
                    <TextInput
                        autoFocus
                        value={query}
                        onChangeText={newQuery => {
                            if (newQuery.length > APP_CONFIG.TEXT_INPUT_LIMIT) {
                                return
                            }
                            setQuery(newQuery)
                            debounceAction(newQuery)
                        }}
                    />
                    <LoaderContainer>
                        {loadingDetectingLanguage && (<Loader />)}
                    </LoaderContainer>
                    <InputFooter>
                        <Confidence
                            hasError={errorDetectingLangauge && selectedLanguages.source === LanguageCode.Auto}
                            autoDetectedLanguage={autoDetectedLanguage}
                            onClick={() => {
                                setSelectedLanguages(prevState => ({
                                    ...prevState,
                                    source: autoDetectedLanguage?.language as LanguageCode
                                }))
                                setAutoDetectedLanguage(undefined)
                                debounceAction(query)
                            }}
                        />
                        <TextCounter
                            counter={query.length}
                            limit={APP_CONFIG.TEXT_INPUT_LIMIT}
                        />
                    </InputFooter>
                </InputContainer>
                <ExchangeLanguage
                    hidden={selectedLanguages.source === LanguageCode.Auto}
                    onClick={() => setSelectedLanguages(prevState => ({
                        source: prevState.target,
                        target: prevState.source
                    }))}
                />
                <InputContainer>
                    <SelectLanguage
                        languages={languages}
                        exclude={[selectedLanguages.source, LanguageCode.Auto]}
                        onChange={newCode => setSelectedLanguages(prevState => ({
                            ...prevState,
                            target: newCode
                        }))}
                        selectedLanguage={selectedLanguages.target}
                    />
                    <TextInput
                        disabled
                        value={translatedText}
                        hasError={errorTranslatedText}
                    />
                    <LoaderContainer>
                        {loadingTranslatedText && (<Loader />)}
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
    height: 2px;
`

const InputFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

