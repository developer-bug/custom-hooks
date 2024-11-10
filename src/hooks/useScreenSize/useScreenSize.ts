import { useEffect, useState } from 'react';

declare const window: Window;

/**
 * Custom hook to detect if the screen matches a given media query.
 * Allows monitoring of screen size changes and returns whether the current screen width matches the specified query.
 *
 * @param query - A CSS media query string for screen width. Defaults to `(max-width: 450px)` if none is provided.
 *
 * @returns A boolean indicating if the current screen width matches the specified media query.
 *
 * ### Usage:
 * Use `useScreenSize` to conditionally render components based on screen width.
 *
 * - Pass a media query string, or use the default `(max-width: 450px)` for small screens.
 * - The hook returns `true` if the screen size matches the query and `false` otherwise.
 *
 * ### Example:
 * ```typescript
 * import useScreenSize from './hooks/useScreenSize';
 *
 * const MyResponsiveComponent = () => {
 *   const isSmallScreen = useScreenSize('(max-width: 768px)');
 *
 *   return (
 *     <div>
 *       {isSmallScreen ? <p>Small screen layout</p> : <p>Large screen layout</p>}
 *     </div>
 *   );
 * };
 * ```
 */
const useScreenSize = (query: string = '(max-width: 450px)') => {
    const [match, setMatch] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(query);
        const handleChange = (event: MediaQueryListEvent) => setMatch(event.matches);

        setMatch(mediaQuery.matches); // Initial check
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [query]);

    return match;
};

export default useScreenSize;
