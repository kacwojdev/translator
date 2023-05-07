export type Dictionary = {
    app: {
        translatorPlaceholder: string,
        disabledTranslatorPlaceholder: string
    }
    common: {
        autoTranslate: string
    },
    components: {
        header: {
            title: string,
            github: string
        },
        footer: {
            author: string,
            flatIcon: string,
            libreTranslate: string
        },
        message: {
            tryAgain: string,
            errorNoSupportedLanguage: string,
            errorSomethingWentWrong: string
        }
    }
}
