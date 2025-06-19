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

    const today = new Date();
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const [appointments, setAppointments] = useState([
        {
            id: 1,
            title: "Mock exam",
            date: new Date(),
            instructor: "John Doe",
            start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30, 0),
            end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0, 0),
            employee_has_service: {
                employee: {
                    name: "John Doe"
                }
            }
        },
        {
            id: 2,
            title: "Manual Lesson",
            date: new Date(),
            instructor: "Jane Doe",
            start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 30, 0),
            end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 11, 0, 0),
            employee_has_service: {
                employee: {
                    name: "Jane Doe"
                }
            }
        }
    ]);


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
/*
    useEffect(() => {
        fetchInitialAppointments();
    }, [fetchInitialAppointments]);
*/
    return {
        appointments,
        appointmentFetchLoading,
        appointmentFetchError,
        loadMoreAppointments,
        hasMore,
        loading,
    };
};
