import {LoginPage} from "../Domain/Auth/Pages/loginPage";
import {JSX} from "react";
import {RegisterPage} from "../Domain/Auth/Pages/registerPage";
import {ForgotPasswordPage} from "../Domain/Auth/Pages/forgotPasswordPage";
import {DashboardPage} from "../Domain/Dashboard/Pages/dashboardPage";
import {BookingPage} from "../Domain/Booking/Pages/bookingPage";
import {ServicePage} from "../Domain/Service/Pages/servicePage";
import {EmployeePage} from "../Domain/Employee/Pages/employeePage";
import {ServiceCreatePage} from "../Domain/Service/Pages/serviceCreatePage";
import {EmployeeCreatePage} from "../Domain/Employee/Pages/employeeCreatePage";
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
