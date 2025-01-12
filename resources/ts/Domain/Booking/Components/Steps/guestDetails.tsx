import React, {useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../src/components/ui/card";
import { motion } from "framer-motion";
import { Input } from "../../../../../src/components/ui/input";
import { Label } from "../../../../../src/components/ui/label";
import { Button } from "../../../../../src/components/ui/button";
import {ChevronLeft} from "lucide-react";
import {format} from "date-fns";

interface GuestDetailsProps {
    onNext: (data: any) => void;
    onBack: () => void;
}

export const GuestDetails = ({ onNext, onBack }: GuestDetailsProps) => {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        city: "",
        postCode: "",
        address: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const gradientClasses = "bg-gradient-to-r from-orange-400 to-amber-500"
    const gradientHoverClasses = "hover:from-orange-500 hover:to-amber-600"

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
                        Fill data
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-orange-200">
                                    User credentials
                                </h2>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-orange-200">
                                    User details
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="phoneNumber">Phone Number</Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        required
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-orange-200">
                                    Address
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="postCode">Post code</Label>
                                        <Input
                                            id="postCode"
                                            name="postCode"
                                            required
                                            value={formData.postCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
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
                                type="submit"
                                className={`px-8 text-white ${gradientClasses} ${gradientHoverClasses}`}
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}
