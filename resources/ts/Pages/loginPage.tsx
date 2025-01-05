import React, { useState } from 'react';
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import {Separator} from "@/src/components/ui/separator";
import {useFetchSubmit} from "@/ts/Hooks/useFetch";
import {updateProperty} from "@/ts/Helpers/useUpdateProperty";
import {Link} from "react-router";
import {Apple, Chrome} from "lucide-react";
import {useNavigate} from "react-router";
import api from "../Config/axios";
import {setToken} from "../Stores/Reducers/AuthSlice";
import {useDispatch} from "react-redux";

interface LoginData {
    email: string,
    password: string
}

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });

    const postLoginDataFetch = async () => {
        return await api.post("/login", loginData);
    };

    const {error: loginError, execute } = useFetchSubmit(postLoginDataFetch);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        execute()
            .then((data) => {
                dispatch(setToken(data?.token));
                navigate('/dashboard');
            })
            .catch(_ => {})
    }

    const handleGoogleLogin = () => {
        window.location.replace("http://localhost/auth/google/redirect");
    }

    const handleAppleLogin = () => {
        window.location.replace("http://localhost/auth/apple/redirect");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Member Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        {loginError && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertDescription>{loginError?.toString()}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email"
                                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={loginData.email}
                                    onChange={(e) => updateProperty('email', e.target.value, setLoginData)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password"
                                       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) => updateProperty('password', e.target.value, setLoginData)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>
                        <Button className="w-full mt-6" type="submit" variant="default">
                            Login
                        </Button>
                    </form>

                    <div className="mt-6">
                        <Separator className="my-4 bg-slate-300"/>
                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleGoogleLogin}
                            >

                                <Chrome className="mr-2 h-4 w-4"/>
                                Login with Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={handleAppleLogin}
                            >
                                <Apple className="mr-2 h-4 w-4"/>
                                Login with Apple
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="link" asChild>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </Button>
                    <Button variant="link" asChild>
                        <Link to="/register">Register</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
