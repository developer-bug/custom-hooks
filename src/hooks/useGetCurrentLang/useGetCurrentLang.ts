import { useEffect, useState } from 'react'

/**
 * Custom hook for dynamically loading and managing translations based on the current language (locale).
 * This hook fetches the translation dictionary for a specific module and route, and updates it automatically
 * when the locale changes.
 * 
 * @param {object} dictionary - The default translation dictionary.
 * @param {string} module - The name of the module where the translations are located.
 * @param {string} route - The specific route within the module for which translations are fetched.
 * @param {string} locale - The current locale code (e.g., 'en', 'es', etc.).
 * 
 * @returns {{ dict: object, locale: string }} - An object containing:
 *  - `dict`: The current translation dictionary for the given locale, module, and route.
 *  - `locale`: The current locale being used.
 * 
 * @example
 * ```typescript
 * import { useGetCurrentLang } from '@developer-bug/custom-hooks';
 * const MyComponent = () => {
 *      const defaultDictionary = {
            greeting: "Hi",
            welcomeMessage: "Welcome!"
        };
 *      const { dict, locale } = useGetCurrentLang(defaultDictionary, 'home', 'main', 'en');
 *
 *      useEffect(() => {
 *        console.log('Current dictionary:', dict);
 *      }, [dict]);
 * }
 * ```
 */
const useGetCurrentLang = (dictionary: any, module: string, route: string, locale: string) => {
    const [dict, setDict] = useState(dictionary)

    useEffect(() => {
        if (locale) {
            const translate = async () => {
                const { dictionary } = await import(`@/lang/translations/${module}/${route}/${locale}`)
                if (!dictionary || dictionary == undefined) { setDict(dict) }
                else { setDict(dictionary) }
            }
            translate()
            return () => { translate() }
        }
    }, [locale])
    return { dict, locale };
};

export default useGetCurrentLang;
