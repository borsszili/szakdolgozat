import {SiteHeader} from "../../../Common/Components/siteHeader";
import {Card, CardContent, CardHeader, CardTitle} from "../../../../src/components/ui/card";
import React from "react";
import {CreateEmployeeForm} from "../Components/createEmployeeForm";

export const EmployeeCreatePage  = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <SiteHeader/>
            <main className="flex-1 container py-6 px-4 sm:px-6 lg:px-8 min-w-full">
                <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
                    <CardHeader className="px-4 sm:px-6">
                        <CardTitle className="text-2xl font-bold text-center">Create new employee</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 scrollable-card-content">
                        <CreateEmployeeForm/>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
