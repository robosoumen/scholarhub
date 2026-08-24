import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import DashboardLayout from "../Layout/DashboardLayout";
import AddScholarship from "../Pages/Admin/AddScholarship";
import ScholarshipDetails from "../Pages/AllScholarship/ScholarshipDetails";
import Payment from "../Pages/Payment/Payment";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Payment/PaymentCancel";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout></RootLayout>,
        children:[
            {
               index:true,
                Component:Home
            },
            {
                path:'scholarship/:id',
                element:<ScholarshipDetails></ScholarshipDetails>
            },
            {
                path:'payment/:id',
                element:<Payment></Payment>
            },
            {
                path:'payment-success',
                element:<PaymentSuccess></PaymentSuccess>
            },
            {
                path:'payment-cancelled',
                element:<PaymentCancel></PaymentCancel>
            }
        ]
    },
    {
        path:'/',
        element:<AuthLayout></AuthLayout>,
        children:[
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    },
    {
        path:'dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                path:'addScholarship',
                element:<AddScholarship></AddScholarship>
            },
            {
                path: 'allScholarShip',
                element:<AllScholarship></AllScholarship>
            },
            
        ]
    }
])