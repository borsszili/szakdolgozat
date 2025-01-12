import {SiteHeader} from "../../../Common/Components/siteHeader";
import {Card, CardContent, CardHeader, CardTitle} from "../../../../src/components/ui/card";
import React from "react";
import {CreateServiceForm} from "../Components/createServiceForm";

export const ServiceCreatePage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <SiteHeader/>
            <main className="flex-1 container py-6 px-4 sm:px-6 lg:px-8 min-w-full">
                <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
                    <CardHeader className="px-4 sm:px-6">
                        <CardTitle className="text-2xl font-bold text-center">Create a new service</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6 scrollable-card-content">
                        <CreateServiceForm/>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
