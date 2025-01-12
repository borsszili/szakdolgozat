import React from "react";
import {SiteHeader} from "../../../Common/Components/siteHeader";
import {Card, CardContent, CardHeader, CardTitle} from "../../../../src/components/ui/card";
import {AppointmentCard} from "../Components/appointmentCard";
import {AnimatePresence, motion} from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import {useAppointments} from "../../../Common/Hooks/useAppointments";

export const DashboardPage  = () => {
    const {appointments, loadMoreAppointments, appointmentFetchLoading, appointmentFetchError, hasMore, loading} = useAppointments();

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
                            loader={appointmentFetchLoading ? <h4 className="text-center py-4">Loading...</h4> : null}
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
