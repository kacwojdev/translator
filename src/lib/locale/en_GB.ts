import { Dictionary } from "lib/types";

export const en_GB: Dictionary = {
    app: {
        translatorPlaceholder: 'Type text here ...',
        disabledTranslatorPlaceholder: 'Translation will show up here ...'
    },
    common: {
        autoTranslate: 'Auto Detect',
    },
    components: {
        header: {
            title: 'Translator ReactJS',
            github: 'Github',
        },
        footer: {
            author: 'Kacper Wojnowski',
            flatIcon: 'FlatIcons',
            libreTranslate: 'LibreTranslate'
        },
        message: {
            tryAgain: "Try again",
            errorNoSupportedLanguage: "No supported language.",
            errorSomethingWentWrong: "Something went wrong."
        },
        confidence: {
            error: "We couldn't detect the language."
        }
    }
}
