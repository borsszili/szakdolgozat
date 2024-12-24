import {useState} from "react";
import React from "react";
import {AnimatePresence} from "framer-motion";
import {StepIndicator} from "@/ts/Components/BookingPage/stepIndicator";
import {ServiceSelection} from "../Components/BookingPage/steps/serviceSelection";
import {DateSelection} from "../Components/BookingPage/steps/dateSelection";
import {Link} from "react-router";
import {GuestDetails} from "../Components/BookingPage/steps/guestDetails";
import {SummarySection} from "../Components/BookingPage/steps/summarySection";


export const BookingPage = () => {
    const [step, setStep] = useState(1)
    const [bookingData, setBookingData] = useState({})

    const handleNext = (data: any) => {
        setBookingData((prev) => ({ ...prev, ...data }))
        setStep((prev) => prev + 1)
    }

    const handleBack = () => {
        setStep((prev) => prev - 1)
    }

    const handleStep = (step) => {
        setStep(step);
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <main className="flex-1 container py-6 px-4 sm:px-6 lg:px-8 min-w-full">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl font-bold text-center">
                        <Link to="/dashboard">
                            Driving School Ltd.
                        </Link>
                    </h1>

                    <StepIndicator currentStep={step} totalSteps={4} setStep={handleStep} />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <ServiceSelection key="step1" onNext={handleNext} />
                        )}
                        {step === 2 && (
                            <DateSelection
                                key="step2"
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {step === 3 && (
                            <GuestDetails
                                key="step3"
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {step === 4 && (
                        <SummarySection
                            key="step4"
                            bookingData={bookingData}
                            onNext={handleNext}
                            onBack={handleBack}
                        />
                    )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
