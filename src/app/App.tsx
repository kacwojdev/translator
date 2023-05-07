import {useEffect, useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import {theme} from "lib/styles";
import {Footer, Header, Loader, Message} from "lib/components";
import {Language} from "lib/models";
import {useTranslations} from "lib/hooks";
import {TranslatorScreen, translatorActions} from "features/Translator";

export const App = () => {
    const T = useTranslations()
    const [languages, setLanguages] = useState<Array<Language>>([])
    const {loading, error, fetch: getSupportedLanguages } = translatorActions.useSupportedLanguages(
        languages => setLanguages(languages)
    )

    useEffect(() => {
        getSupportedLanguages()
    }, [])

    const getLayout = () => {
        if (loading) {
            return (
                <Container>
                    <Loader/>
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
                    <Message message={T.components.message.errorNoSupportedLanguage}/>
                </CenterContainer>
            )
        }

        return <TranslatorScreen languages={languages} />
    }

    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Header />
                {getLayout()}
                <Footer />
            </AppContainer>
        </ThemeProvider>
    )
}

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: ${({theme}) => theme.colors.background};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    color: ${({theme}) => theme.colors.typography};
`
