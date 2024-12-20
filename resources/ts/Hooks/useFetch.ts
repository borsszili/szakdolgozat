import {useCallback, useEffect, useState} from "react";

export const useFetch = (fetchFn) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);

        fetchFn().then(setData).finally(() => setLoading(false));
    }, []);

    return {data, loading}
}


export const useFetchSubmit = (fetchFn) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState<string|object|null>(null);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    return { data, loading, error, execute };
}
