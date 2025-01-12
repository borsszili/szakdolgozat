import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "../../../../src/components/ui/button";
import { Input } from "../../../../src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../src/components/ui/card";
import { Label } from "../../../../src/components/ui/label";
import { Checkbox } from "../../../../src/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../src/components/ui/form";
import { createEmployee } from '../Actions/useCreateEmployee';
import { toast } from '../../../../src/hooks/use-toast';
import { useNavigate } from "react-router";
import {ArrowLeft, LoaderCircle} from "lucide-react";
import {Separator} from "../../../../src/components/ui/separator";
import {Textarea} from "../../../../src/components/ui/textarea";

const formSchema = z.object({
    userData: z.object({
        email: z.string().email(),
        name: z.string().min(2),
        password: z.string().min(8),
        passwordConfirmation: z.string().min(8),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
    }),
    employeeData: z.object({
        workingHours: z.object({
            monday: z.object({ start: z.string(), end: z.string() }),
            tuesday: z.object({ start: z.string(), end: z.string() }),
            wednesday: z.object({ start: z.string(), end: z.string() }),
            thursday: z.object({ start: z.string(), end: z.string() }),
            friday: z.object({ start: z.string(), end: z.string() }),
            saturday: z.object({ start: z.string(), end: z.string() }),
            sunday: z.object({ start: z.string(), end: z.string() }),
        }),
        services: z.array(z.string()),
    }),
})

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const services = [
    { id: '1', name: 'Manual Lesson' },
    { id: '2', name: 'Automatic Lesson' },
]

export const CreateEmployeeForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>(({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userData: {
                email: '',
                name: '',
                password: '',
                passwordConfirmation: '',
            },
            employeeData: {
                workingHours: {
                    monday: {
                        start: '',
                        end: ''
                    },
                    tuesday: {
                        start: '',
                        end: ''
                    },
                    wednesday: {
                        start: '',
                        end: ''
                    },
                    thursday: {
                        start: '',
                        end: ''
                    },
                    friday: {
                        start: '',
                        end: ''
                    },
                    saturday: {
                        start: '',
                        end: ''
                    },
                    sunday: {
                        start: '',
                        end: ''
                    }
                },
                services: [],
            },
        }
    }));

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            await createEmployee(data)
            toast({
                title: "Employee created",
                description: "The employee has been successfully created.",
            })
            navigate('/settings/employee')
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an error creating the employee. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <h2 className="font-bold"> User details </h2>

                <Separator className="my-4 bg-slate-300"/>

                <FormField
                    control={form.control}
                    name="userData.email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter email" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="userData.name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter name" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="userData.password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter password" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="userData.passwordConfirmation"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password Confirmation</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter password again" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <h2 className="font-bold"> Employee details </h2>

                <Separator className="my-4 bg-slate-300"/>

                <div>
                    <h3 className="font-semibold pb-3">Working hours</h3>

                    {daysOfWeek.map((day) => (
                        <div key={day} className="pl-5">
                            <h6 className="font-medium capitalize"> {day} </h6>

                            <div className="flex pl-5 space-x-3">
                                <FormField
                                    control={form.control}
                                    name={`employeeData.workingHours.${day}.start`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-gray-600">Start</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    className="resize-none w-25"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`employeeData.workingHours.${day}.end`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-medium text-gray-600">End</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    className="resize-none w-25"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>

                    ))}
                </div>

                <div>
                    <h3 className="font-semibold pb-3">Services</h3>

                    {services.map((service) =>
                        <div key={service.id} className="pl-5">
                            <FormField
                                control={form.control}
                                name={`employeeData.workingHours.services`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium text-gray-600">{service.name}</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                id={`service-${service.id}`}
                                                checked={false}
                                                onCheckedChange={(checked) => {}}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className="flex">
                <Button
                        className="mr-auto bg-gradient-to-r from-orange-400 to-amber-500"
                        onClick={() => navigate('/settings/employee')}
                    >
                        <ArrowLeft/>
                        Back
                    </Button>
                    <Button className="ml-auto bg-gradient-to-r from-orange-400 to-amber-500" type="submit"
                            disabled={isLoading}>
                        {isLoading && (
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Create employee
                    </Button>
                </div>
            </form>
        </Form>
    )
}
