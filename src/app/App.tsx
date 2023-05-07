import styled, {ThemeProvider} from "styled-components";
import {theme} from "lib/styles";
import {Footer, Header} from "lib/components";
import {TranslatorScreen} from "features/Translator";
export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Header />
                <TranslatorScreen />
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
