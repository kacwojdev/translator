import styled from 'styled-components'
import { useTranslations } from 'lib/hooks/index.ts'

export const TranslatorScreen = () => {
    const T = useTranslations()

    return (
        <Container>
            Hello world!
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    color: ${({theme}) => theme.colors.typography};
`
