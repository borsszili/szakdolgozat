import React, {useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Alert, AlertDescription} from "@/src/components/ui/alert";
import {Input} from "@/src/components/ui/input";
import {Button} from "@/src/components/ui/button";
import {Link} from "react-router";
import axios from "axios";
import {useFetchSubmit} from "../Hooks/useFetch";
import {updateProperty} from "../Helpers/useUpdateProperty";

interface ForgotPasswordData {
    email: string,
}

export const ForgotPasswordPage  = () => {
    const [passwordData, setPasswordData] = useState<ForgotPasswordData>({email: ""});
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const postForgotPasswordDataFetch = async () => {
        return await axios.post("/forgot-password", passwordData);
    };

    const { data: postLoginData, loading, error: forgotPasswordError, execute } = useFetchSubmit(postForgotPasswordDataFetch);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        if (!passwordData.email) {
            setError('Email is required')
            return
        }

        await execute();

        if(!forgotPasswordError) {

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert variant="default" className="mb-4">
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={passwordData.email}
                                    onChange={(e) => updateProperty('email', e.target.value, setPasswordData)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <Button className="w-full mt-6" type="submit">
                            Reset Password
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button variant="link" asChild>
                        <Link to="/login">Back to Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
