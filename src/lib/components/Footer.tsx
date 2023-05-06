import styled from "styled-components";
import {useTranslations} from "lib/hooks";
import {APP_CONFIG} from "lib/config";

export const Footer = () => {
    const T = useTranslations()
    const currentYear = new Date().getFullYear()

    return (
        <FooterContainer>
            <AuthorContainer>
                &copy; {T.footer.author} {currentYear}
            </AuthorContainer>
            <LinkContainer>
                <Link href={APP_CONFIG.FLATICON_URL}>
                    {T.footer.flatIcon}
                </Link>
                <Link href={APP_CONFIG.LIBRETRANSLATE_URL}>
                    {T.footer.libreTranslate}
                </Link>
            </LinkContainer>
        </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background-color: ${({theme}) => theme.colors.foreground};
`

const AuthorContainer = styled.div`
    color: ${({theme}) => theme.colors.typography};
`
const LinkContainer = styled.div``
const Link = styled.a`
    color: ${({theme}) => theme.colors.typography};
    text-decoration: underline;
    cursor: pointer;
    padding: 0 10px;
`
