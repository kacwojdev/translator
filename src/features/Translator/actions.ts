import {useState} from "react";
import {AutoDetectedLanguage, Language, LanguageCode} from "lib/models";
import {APP_CONFIG} from "lib/config";
import {useTranslations} from "../../lib/hooks";

export const useSupportedLanguages = (
    onSuccess: (languages: Array<Language>) => void
) => {
    const T = useTranslations()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>()

    return {
        loading,
        error,
        fetch: () => {
            setLoading(true)
            setError(false)

            fetch(`${APP_CONFIG.API_URL}languages`)
                .then(response => {
                    if (response.ok) return response
                    throw response
                })
                .then(response => response.json())
                .then(languages => {
                    const allLanguages: Array<Language> = [
                        {
                            code: LanguageCode.Auto,
                            name: T.common.autoTranslate
                        }
                    ].concat(languages)
                    onSuccess(allLanguages)
                })
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        }
    }
}

export const useAutoDetectLanguage = (
    onSuccess: (autoDetectLangauge: AutoDetectedLanguage) => void
) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    return {
        loading,
        error,
        fetch: (query: string) => {
            setLoading(true)
            setError(false)

            fetch(`${APP_CONFIG.API_URL}detect`, {
                method: 'POST',
                body: JSON.stringify({
                    q: query
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    if (response.ok) return response
                    throw response
                })
                .then(response => response.json())
                .then(([autoDetectedLanguage]) => onSuccess(autoDetectedLanguage))
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        }
    }
}
