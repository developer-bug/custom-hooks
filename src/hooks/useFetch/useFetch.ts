import { useState, useCallback } from 'react';

interface FetchOptions extends RequestInit {
    headers?: HeadersInit
}

interface FetchResponse<T, G> {
    data: T | null;
    error: string | null;
    loading: boolean;
    get: () => void;
    post: (body: G) => void;
    put: (body: G) => void;
    delete: () => void;
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Custom hook for making HTTP requests using the Fetch API in React.
 * This hook provides methods for all standard HTTP methods and can handle
 * GET, POST, PUT, and DELETE requests.
 * 
 * @template T - Type of the response data.
 * @template G - Type of the request body for methods like POST and PUT (optional).
 * 
 * @param {string} url - The endpoint URL for the HTTP request.
 * @param {FetchOptions} options - Additional fetch options such as headers or credentials.
 * 
 * @returns {FetchResponse<T, G>} - An object containing:
 *  - `data`: The response data from the request.
 *  - `error`: Any error message encountered during the request.
 *  - `loading`: A boolean indicating if the request is in progress.
 *  - `get`: A function to initiate a GET request.
 *  - `post`: A function to initiate a POST request with a request body.
 *  - `put`: A function to initiate a PUT request with a request body.
 *  - `delete`: A function to initiate a DELETE request.
 * 
 * @example
 * ```typescript
 * const { data, error, loading, get, post } = useFetch<DataType>('https://api.example.com/data');
 * 
 * useEffect(() => {
 *   get();
 * }, []);
 * 
 * const handleSubmit = async (newData: RequestBodyType) => {
 *   await post(newData);
 * };
 * ```
 */
const useFetch = <T, G = null>(url: string, options: FetchOptions = {}): FetchResponse<T, G> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const request = useCallback(
        async <G,>(method: HTTPMethod = 'GET', body: G | null = null) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url, {
                    ...options,
                    method,
                    headers: {
                        'content-type': 'application/json',
                        ...options.headers,
                    },
                    body: body ? JSON.stringify(body) : null,
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setData(responseData);
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        }
        , [url, options])

    return {
        data,
        error,
        loading,
        get: () => request('GET'),
        post: (body: G) => request<G>('POST', body),
        put: (body: G) => request<G>('PUT', body),
        delete: () => request('DELETE'),
    }
}

export default useFetch;
