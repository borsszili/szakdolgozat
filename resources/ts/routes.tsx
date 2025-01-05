import {LoginPage} from "./Pages/loginPage";
import {JSX} from "react";
import {RegisterPage} from "./Pages/registerPage";
import {ForgotPasswordPage} from "./Pages/forgotPasswordPage";
import {DashboardPage} from "./Pages/dashboardPage";
import {BookingPage} from "./Pages/bookingPage";
import {ServicePage} from "./Pages/Settings/Services/servicePage";
import {EmployeePage} from "./Pages/Settings/Employees/employeePage";
import {ServiceCreatePage} from "./Pages/Settings/Services/serviceCreatePage";
import {EmployeeCreatePage} from "./Pages/Settings/Employees/employeeCreatePage";
export const routes: ({ path: string; element: JSX.Element } | {
    path: string;
    index: boolean;
    element: JSX.Element
})[] = [
    {
        "path": "",
        "element": <LoginPage/>,
        "index": true,
    },
    {
        "path": "register",
        "element": <RegisterPage/>,
    },
    {
        "path": "login",
        "element": <LoginPage/>,
    },
    {
        "path": "forgot-password",
        "element": <ForgotPasswordPage/>,
    },
    {
        "path": "dashboard",
        "element": <DashboardPage/>,
    },
    {
        "path": "book",
        "element": <BookingPage/>
    },
    {
        "path": "settings/service",
        "element": <ServicePage/>
    },
    {
        "path": "settings/service/create",
        "element": <ServiceCreatePage/>
    },
    {
        "path": "settings/service/update/:id",
        "element": <ServicePage/>
    },
    {
        "path": "settings/employee",
        "element": <EmployeePage/>
    },
    {
        "path": "settings/employee/create",
        "element": <EmployeeCreatePage/>
    },
    {
        "path": "settings/employee/update/:id",
        "element": <EmployeePage/>
    },
]
