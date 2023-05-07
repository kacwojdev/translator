import styled from 'styled-components'
import {useDebouncedCallback} from 'use-debounce'
import {Confidence, ExchangeLanguage, Loader, SelectLanguage, TextCounter, TextInput} from 'lib/components'
import React, {useState} from "react";
import {AutoDetectedLanguage, Language, LanguageCode} from 'lib/models'
import {SelectedLanguages} from "./types.ts";
import {APP_CONFIG} from "../../lib/config";
import {useAutoDetectLanguage} from "./actions.ts";

type TranslatorScreenProps = {
    languages: Array<Language>
}
export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({
    languages
}) => {
    const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguages>({
        source: LanguageCode.Auto,
        target: LanguageCode.English
    })
    const [autoDetectedLanguage, setAutoDetectedLanguage] = useState<AutoDetectedLanguage>({
        confidence: 70,
        language: LanguageCode.Polish
    })
    const [query, setQuery] = useState<string>('')
    const {
        loading: loadingDetectingLanguage,
        error: errorDetectingLangauge,
        fetch: autoDetectLanguage
    } = useAutoDetectLanguage(setAutoDetectedLanguage)
    const debounceAutoDetectLanguage = useDebouncedCallback(
        debouncedQuery => {
            if (debouncedQuery.length < 5) {
                return
            }

            if (selectedLanguages.source === LanguageCode.Auto) {
                autoDetectLanguage(debouncedQuery)
            }
        },
        1000
    )

    return (
        <Container>
            <TranslatorContainer>
                <InputContainer>
                    <SelectLanguage
                        languages={languages}
                        exclude={[selectedLanguages.target]}
                        onChange={newCode => setSelectedLanguages(prevState => ({
                            ...prevState,
                            source: newCode
                        }))}
                        selectedLanguage={selectedLanguages.source}
                    />
                    <TextInput
                        autoFocus
                        value={query}
                        onChangeText={newQuery => {
                            if (newQuery.length > APP_CONFIG.TEXT_INPUT_LIMIT) {
                                return
                            }
                            setQuery(newQuery)
                            debounceAutoDetectLanguage(newQuery)
                        }}
                    />
                    <LoaderContainer>
                        {loadingDetectingLanguage && (<Loader />)}
                    </LoaderContainer>
                    <InputFooter>
                        <Confidence
                            autoDetectedLanguage={autoDetectedLanguage}
                            onClick={() => {
                                setSelectedLanguages(prevState => ({
                                    ...prevState,
                                    source: autoDetectedLanguage?.language as LanguageCode
                                }))
                                setAutoDetectedLanguage(undefined)
                            }}
                            hasError={errorDetectingLangauge && selectedLanguages.source === LanguageCode.Auto} // todo
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
                    />
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
    height: 2px;
`

const InputFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

