import { useEffect, useState, useCallback } from 'react';
import {useFetchSubmit} from "./useFetch";
import api from "../Config/axios";

export const useAppointments = () => {
    const fetchMoreAppointments = useCallback(async () => {
        return await api.get("/appointment", {
            params: {
                offset: step,
            }})
    }, []);

    const {loading: appointmentFetchLoading, error: appointmentFetchError, execute} = useFetchSubmit(fetchMoreAppointments);

    const [appointments, setAppointments] = useState([]);
    const [step, setStep] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadMoreAppointments = useCallback(async () => {
        if (hasMore === false) return;

        await execute();

        const appointment = await execute();

        if(appointment) {
            setAppointments((curr) => [...curr, ...appointment]);
        }
        setStep((prevStep) => prevStep + 10);

    }, [execute]);

    const fetchInitialAppointments = useCallback(async () => {
        const appointment = await execute();

        if(appointment) {
            setAppointments([...appointment]);
        }
    }, [execute]);

    useEffect(() => {
        fetchInitialAppointments();
    }, [fetchInitialAppointments]);

    return {
        appointments,
        appointmentFetchLoading,
        appointmentFetchError,
        loadMoreAppointments,
        hasMore,
        loading,
    };
};
