import {useState} from "react";
import {Language} from "../../lib/models";
import {APP_CONFIG} from "../../lib/config";

export const useSupportedLanguages = (
    onSuccess: (languages: Array<Language>) => void
) => {
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
                .then(onSuccess)
                .catch(error => setError(error))
                .finally(() => setLoading(false))
        }
    }
}
