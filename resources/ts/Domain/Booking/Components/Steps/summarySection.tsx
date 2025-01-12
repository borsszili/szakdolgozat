import {ChevronLeft} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../src/components/ui/card";
import { Button } from "../../../../../src/components/ui/button";
import {format} from "date-fns";
import React from "react";

interface BookingSummaryProps {
    onNext: (data: any) => void;
    onBack: () => void;
    bookingData: {
        service: string;
        provider: string;
        date: Date;
        start: Date;
        end: Date;
        quantity: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        city: string;
        address: string;
        postCode: string;
        price: number;
    };
}

export const SummarySection = ({ onNext, onBack, bookingData}: BookingSummaryProps ) => {
    const handleSubmit = () => {
        onNext(bookingData)
    }

    const gradientClasses = "bg-gradient-to-r from-orange-400 to-amber-500"
    const gradientHoverClasses = "hover:from-orange-500 hover:to-amber-600"

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-orange-200">
            {children}
        </h2>
    )

    const InfoRow = ({ label, value }: { label: string; value: string }) => (
        <div className="flex justify-between py-1">
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-medium">{value}</span>
        </div>
    )

    bookingData.date = new Date();
    bookingData.start = new Date();
    bookingData.end = new Date();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
        >
            <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Appointment payment & confirmation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <SectionTitle>User information</SectionTitle>
                        <div className="space-y-1">
                            <InfoRow
                                label="Name"
                                value={`${bookingData.firstName} ${bookingData.lastName}`}
                            />
                            <InfoRow
                                label="Phone number"
                                value={bookingData.phoneNumber}
                            />
                            <InfoRow
                                label="Email"
                                value={bookingData.email}
                            />
                            <InfoRow
                                label="Location"
                                value={`${bookingData.address}, ${bookingData.city} ${bookingData.postCode}`}
                            />
                        </div>
                    </div>

                    <div>
                        <SectionTitle>Provider</SectionTitle>
                        <div className="space-y-1">
                            <InfoRow
                                label="Service"
                                value={`${bookingData.quantity} Hour Manual Lesson`}
                            />
                            <InfoRow
                                label="Provider"
                                value={bookingData.provider === 'john' ? 'John Doe' : 'Jane Smith'}
                            />
                        </div>
                    </div>

                    <div>
                        <SectionTitle>Appointment</SectionTitle>
                        <div className="space-y-1">
                            <div className="font-medium">{bookingData.quantity} Hour Manual Lesson</div>
                            <InfoRow
                                label="Start"
                                value={`${format(bookingData.date, 'dd/M/yyyy')} ${bookingData.start}`}
                            />
                            <InfoRow
                                label="End"
                                value={`${format(bookingData.date, 'dd/M/yyyy')} ${bookingData.end}`}
                            />
                            <InfoRow
                                label="Price"
                                value={`£${bookingData.price * bookingData.quantity}`}
                            />
                        </div>
                    </div>

                    <div>
                        <SectionTitle>Total</SectionTitle>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total price:</span>
                            <span className="text-xl font-bold">£{bookingData.price * bookingData.quantity}</span>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onBack}
                            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className={`px-8 text-white ${gradientClasses} ${gradientHoverClasses}`}
                        >
                            Book appointment
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
