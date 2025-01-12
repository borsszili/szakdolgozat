import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../../../../src/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../src/components/ui/form";
import { Input } from "../../../../src/components/ui/input";
import { Textarea } from "../../../../src/components/ui/textarea";
import { createService } from "../Actions/useCreateService";
import React from 'react';
import {ArrowLeft, LoaderCircle} from "lucide-react";
import {useNavigate} from "react-router";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Service name must be at least 2 characters.",
    }),
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Price must be a positive number.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
})

export const CreateServiceForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: "",
            description: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            await createService(values)
            navigate("/settings/service")
        } catch (error) {
            console.error("Failed to create service:", error)
            form.setError("root", {
                type: "manual",
                message: "Failed to create service. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Service Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter service name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter price" type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter service description"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex">
                    <Button
                        className="mr-auto bg-gradient-to-r from-orange-400 to-amber-500"
                        onClick={() => navigate('/settings/service')}
                    >
                        <ArrowLeft/>
                        Back
                    </Button>
                    <Button className="ml-auto bg-gradient-to-r from-orange-400 to-amber-500" type="submit" disabled={isLoading}>
                        {isLoading && (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create Service
                    </Button>
                </div>

                {form.formState.errors.root && (
                    <p className="mt-2 text-sm text-red-500">{form.formState.errors.root.message}</p>
                )}
            </form>
        </Form>
    )
}

