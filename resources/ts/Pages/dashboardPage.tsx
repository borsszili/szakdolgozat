import React, { useEffect } from "react";
import {SiteHeader} from "@/ts/Components/siteHeader";
import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/ui/card";
import {AppointmentCard} from "@/ts/Components/appointmentCard";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
export const DashboardPage  = () => {
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            title: 'Driving Lesson',
            date: new Date(2024, 0, 15, 14, 0),
            instructor: 'John Doe',
            location: '123 Main St, Anytown, USA',
            start: new Date(2024, 0, 15, 14, 0),
            end: new Date(2024, 0, 15, 22, 0),
            duration: 20,
            price: 20,
            currency: "$"
        },
        {
            id: 2,
            title: 'Theory Test Prep',
            date: new Date(2024, 0, 18, 10, 0),
            instructor: 'Jane Smith',
            location: '456 Oak Rd, Somewhere, USA',
            start: new Date(2024, 0, 18, 10, 0),
            end: new Date(2024, 0, 18, 20, 0),
            duration: 20,
            price: 20,
            currency: "$"
        },
    ])

    const [hasMore, setHasMore] = useState(true);

    const loadMoreAppointments = () => {
        setTimeout(() => {
            if (appointments.length >= 10) {
                setHasMore(false);
            } else {
                setAppointments((current) => [...current])

                console.log(appointments)
            }
        }, 500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <SiteHeader/>
            <main className="flex-1 container py-6 px-4 sm:px-6 lg:px-8 min-w-full">
                <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
                    <CardHeader className="px-4 sm:px-6">
                        <CardTitle className="text-2xl font-bold text-center">Upcoming Lessons</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 scrollable-card-content">
                        <InfiniteScroll
                            dataLength={appointments.length}
                            next={loadMoreAppointments}
                            hasMore={hasMore}
                            loader={<h4 className="text-center py-4">Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                        >
                                <AnimatePresence>
                                    {
                                        appointments.map((appointment) => (
                                            <motion.div
                                                key={appointment.id}
                                                className="space-y-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3,  staggerChildren: 0.1,}}
                                            >
                                                <div className="pb-3">
                                                    <AppointmentCard  {...appointment}/>
                                                </div>
                                            </motion.div>
                                        ))
                                    }
                                </AnimatePresence>
                        </InfiniteScroll>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
