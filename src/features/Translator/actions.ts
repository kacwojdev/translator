import {useState} from "react";
import {Language, LanguageCode} from "lib/models";
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
