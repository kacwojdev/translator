import styled from "styled-components";
import {Language, LanguageCode} from "../models";
import React, {useMemo} from "react";

type SelectLanguageProps = {
    languages: Array<Language>,
    selectedLanguage: LanguageCode,
    exclude: Array<LanguageCode>
    onChange(newLanguage: LanguageCode): void
}
export const SelectLanguage:React.FunctionComponent<SelectLanguageProps> = ({
    languages,
    selectedLanguage,
    exclude,
    onChange
}) => {
    const filteredLanguages = useMemo(() => languages
        .filter(language => !exclude.includes(language.code))
        .map(language => ({
            key: language.code,
            label: language.name
        })), [languages, exclude])

    return (
        <Select
            value={selectedLanguage}
            onChange={event => onChange(event.target.value as LanguageCode)}
        >
            {filteredLanguages.map(language => (
                <Option
                    key={language.key}
                    value={language.key}
                >
                    {language.label}
                </Option>
            ))}
        </Select>
    )
}

const Select = styled.select`
    max-width: 140px;
    margin-bottom: 10px;
    -webkit-appearance: none;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    background-color: ${({theme}) => theme.colors.foreground};
    color: ${({theme}) => theme.colors.typography};
    padding: 0 10px;
`

const Option = styled.option`

`
