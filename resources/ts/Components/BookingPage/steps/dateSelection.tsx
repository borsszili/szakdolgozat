import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "@/src/components/ui/calendar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ChevronLeft } from 'lucide-react';

interface DateSelectionProps {
    onNext: (data: any) => void;
    onBack: () => void;
}

export const DateSelection = ({ onNext, onBack }: DateSelectionProps) => {
    const [date, setDate] = useState<Date>()
    const [selectedTime, setSelectedTime] = useState<string>()
    const timeSlots = Array.from({ length: 23 }, (_, i) => {
        const hour = Math.floor(i / 4) + 12
        const minute = (i % 4) * 15
        return `${hour}:${minute.toString().padStart(2, '0')}`
    })

    const handleNext = () => {
        if (date && selectedTime) {
            onNext({ date, time: selectedTime })
        }
    }

    const gradientClasses = "bg-gradient-to-r from-orange-400 to-amber-500";
    const gradientHoverClasses = "hover:from-orange-500 hover:to-amber-600";

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
                        Choose booking date
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm mb-4 text-muted-foreground">
                        Reservation: 1/1
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => newDate && setDate(newDate)}
                                className={`rounded-lg border-0 shadow-md w-full [&_.rdp]:w-full [&_.rdp-months]:w-full [&_.rdp-month]:w-full [&_.rdp-table]:w-full [&_.rdp-cell]:w-[14.28%] [&_.rdp-day]:w-full [&_.rdp-day_focus]:bg-gray-100 [&_.rdp-day_hover]:bg-gray-100`}
                                classNames={{
                                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                    month: "space-y-4 w-full",
                                    caption: "flex justify-center pt-1 relative items-center text-gray-900 dark:text-gray-100",
                                    caption_label: "text-sm font-medium",
                                    nav: "space-x-1 flex items-center",
                                    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors",
                                    nav_button_previous: "absolute left-1",
                                    nav_button_next: "absolute right-1",
                                    table: "w-full border-collapse space-y-1",
                                    head_row: "flex w-full",
                                    head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                                    row: "flex w-full mt-2",
                                    cell: "text-center text-sm relative p-0 rounded-md focus-within:relative focus-within:z-20 w-[14.28%]",
                                    day: "h-9 w-full p-0 font-normal rounded-md aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800",
                                    day_selected: `${gradientClasses} text-white ${gradientHoverClasses}`,
                                    day_today: "bg-accent text-accent-foreground",
                                    day_outside: "text-muted-foreground opacity-50",
                                    day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
                                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                    day_hidden: "invisible",
                                }}
                            />
                        </div>

                        <div className="space-y-4">
                            {date && (
                                <>
                                    <h3 className="font-medium text-sm">
                                        Add booking for: {format(date, 'dd/M/yyyy')}
                                    </h3>
                                    <div className="grid grid-cols-5 gap-2">
                                        {timeSlots.map((time) => (
                                            <Button
                                                key={time}
                                                variant={selectedTime === time ? "default" : "outline"}
                                                className={`w-full ${
                                                    selectedTime === time
                                                        ? `${gradientClasses} text-white ${gradientHoverClasses}`
                                                        : "hover:bg-accent hover:text-accent-foreground"
                                                }`}
                                                onClick={() => setSelectedTime(time)}
                                            >
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {selectedTime && (
                        <div className="mt-6 text-sm text-muted-foreground">
                            Selected start time: {selectedTime}
                        </div>
                    )}

                    <div className="flex justify-between mt-6">
                        <Button
                            variant="ghost"
                            onClick={onBack}
                            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={!date || !selectedTime}
                            className={`px-8 text-white ${gradientClasses} ${gradientHoverClasses}`}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
