
import { useState } from "react"
import { motion } from "framer-motion"
import { Minus, Plus } from 'lucide-react'
import { Button } from "../../../../src/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../src/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../src/components/ui/card"

interface ServiceSelectionProps {
    onNext: (data: any) => void;
}

export const ServiceSelection = ({ onNext }: ServiceSelectionProps) => {
    const [service, setService] = useState("")
    const [provider, setProvider] = useState("")
    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity)
        }
    }

    const handleNext = () => {
        onNext({ service, provider, quantity })
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
                        Choose service and provider
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Service
                            </label>
                            <Select value={service} onValueChange={setService}>
                                <SelectTrigger>
                                    <SelectValue placeholder="1 Hour Manual Lesson" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="manual-1h">1 Hour Manual Lesson</SelectItem>
                                    <SelectItem value="manual-2h">2 Hour Manual Lesson</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Provider
                            </label>
                            <Select value={provider} onValueChange={setProvider}>
                                <SelectTrigger>
                                    <SelectValue placeholder="John Doe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="john">John Doe</SelectItem>
                                    <SelectItem value="jane">Jane Smith</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    className="h-10 w-10"
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-xl w-8 text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= 10}
                                    className="h-10 w-10"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="pt-6 border-t">
                            <h3 className="text-sm font-medium mb-4">Description</h3>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p><span className="font-medium">Service:</span> 1 Hour Manual Lesson</p>
                                <p><span className="font-medium">Provider:</span> John Doe</p>
                                <p><span className="font-medium">Time:</span> 60 minutes</p>
                                <p><span className="font-medium">Price:</span> 40 £</p>
                            </div>
                        </div>

                        <Button
                            className={`w-full px-8 text-white ${gradientClasses} ${gradientHoverClasses}`}
                            size="lg"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
