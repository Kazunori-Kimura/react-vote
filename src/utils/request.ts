// API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3080';

/**
 * POST
 * @param url
 * @param payload
 * @param token
 */
export const postData = async <T>(
    url: string,
    payload: string,
    token = ''
): Promise<[boolean, number, string, T?]> => {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers,
        body: payload,
    });

    const { status, statusText } = response;
    if (response.ok) {
        const data = (await response.json()) as T;
        return [true, status, statusText, data];
    }

    return [false, status, statusText];
};

/**
 * GET
 * @param url
 * @param params
 * @param token
 */
export const getData = async <T>(
    url: string,
    params: URLSearchParams | string = '',
    token = ''
): Promise<[boolean, number, string, T?]> => {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    const response = await fetch(`${API_URL}${url}?${params}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers,
    });

    const { status, statusText } = response;
    if (response.ok) {
        const data = (await response.json()) as T;
        return [true, status, statusText, data];
    }

    return [false, status, statusText];
};

/**
 * DELETE
 * @param url
 * @param token
 */
export const deleteData = async (url: string, token = ''): Promise<[boolean, number, string]> => {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    const response = await fetch(`${API_URL}${url}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers,
    });

    const { status, statusText } = response;
    return [response.ok, status, statusText];
};
