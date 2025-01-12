import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../../../../src/components/ui/card";
import React, {useState} from "react";
import {Alert, AlertDescription} from "../../../../src/components/ui/alert";
import {Input} from "../../../../src/components/ui/input";
import { Button } from "../../../../src/components/ui/button";
import {Link} from "react-router";
import {useFetchSubmit} from "../../../Common/Hooks/useFetch";
import {updateProperty} from "../../../Common/Helpers/useUpdateProperty";
import api from "../../../Common/Config/axios";

interface RegisterData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const RegisterPage  = () => {
    const [registerData, setRegisterData] = useState<RegisterData>({name: "", confirmPassword: "", email: "", password: "" });
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const postRegisterDataFetch = async () => {
        return await api.post("/register", registerData);
    };

    const { data: postRegisterData, loading, error: fetchError, execute } = useFetchSubmit(postRegisterDataFetch);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        if (!registerData.email) {
            setError('Email is required')
            return
        }

        await execute();

        console.log(postRegisterData)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={registerData.name}
                                    onChange={(e) => updateProperty('name', e.target.value, setRegisterData)}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={registerData.email}
                                    onChange={(e) => updateProperty('email', e.target.value, setRegisterData)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={registerData.password}
                                    onChange={(e) => updateProperty('password', e.target.value, setRegisterData)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Confirm Password
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={registerData.confirmPassword}
                                    onChange={(e) => updateProperty('confirmPassword', e.target.value, setRegisterData)}
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        </div>
                        <Button className="w-full mt-6" type="submit" variant="default">
                            Register
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="link" asChild>
                        <Link to="/login">Already have an account? Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

