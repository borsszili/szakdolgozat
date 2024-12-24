import {LoginPage} from "./Pages/loginPage";
import {JSX} from "react";
import {RegisterPage} from "./Pages/registerPage";
import {ForgotPasswordPage} from "./Pages/forgotPasswordPage";
import {DashboardPage} from "./Pages/dashboardPage";
import {BookingPage} from "./Pages/bookingPage";
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
]
