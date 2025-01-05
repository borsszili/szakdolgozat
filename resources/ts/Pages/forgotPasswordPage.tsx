import React, {useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import {Alert, AlertDescription} from "@/src/components/ui/alert";
import {Input} from "@/src/components/ui/input";
import {Button} from "@/src/components/ui/button";
import {Link} from "react-router";
import {useFetchSubmit} from "@/ts/Hooks/useFetch";
import {updateProperty} from "@/ts/Helpers/useUpdateProperty";
import {AnimatePresence, motion} from "framer-motion";
import api from "../Config/axios";

interface ForgotPasswordData {
    email: string,
}

const alertVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
};

export const ForgotPasswordPage  = () => {
    const [passwordData, setPasswordData] = useState<ForgotPasswordData>({email: ""});
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const postForgotPasswordDataFetch = async () => {
        return await api.post("/forgot-password", passwordData);
    };

    const { data: postLoginData, loading, error: forgotPasswordError, execute } = useFetchSubmit(postForgotPasswordDataFetch);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        if (!passwordData.email) {
            setError('Email is required');
            return;
        }

        try {
            await execute();
            setSuccess('Password reset instructions have been sent to your email.');
        } catch (err) {
            setError(forgotPasswordError ? String(forgotPasswordError) : 'An error occurred. Please try again.');
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
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    key="error"
                                    variants={alertVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                >
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                            {success && (
                                <motion.div
                                    key="success"
                                    variants={alertVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3 }}
                                >
                                    <Alert
                                        variant="default"
                                        className="mb-4 bg-green-100 border-green-400 text-green-800"
                                    >
                                        <AlertDescription>{success}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
