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
import { PaymentHistory } from "../Pages/PaymentHistory/PaymentHistory";
import ManageUsers from "../Pages/ManageUsers/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManageApplication from "../Pages/ManageApplication/ManageApplication";
import ManageScholarship from "../Pages/ManageScholarship/ManageScholarship";
import MyProfile from "../Pages/MyProfile/MyProfile";
import MyApplication from "../Pages/MyApplication/MyApplication";
import MyReview from "../Pages/MyReview/MyReview";
import AllReviews from "../Pages/AllReviews/AllReviews";
import Analytics from "../Pages/Analytics/Analytics";


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
                path:'allScholarship',
                Component:AllScholarship
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
            },
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
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path: 'paymentHistory',
                element:<PaymentHistory></PaymentHistory>
            },
            {
                path:'addScholarship',
                element:<AdminRoute><AddScholarship></AddScholarship></AdminRoute>
            },
            {
                path:'manageUser',
                element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path:'analytics',
                element:<AdminRoute><Analytics></Analytics></AdminRoute>
            },
            {
                path:'manageApplication',
                element:<ManageApplication></ManageApplication>
            },
            {
                path:'manageScholarship',
                element:<ManageScholarship></ManageScholarship>
            },
            {
                path:'myProfile',
                element:<MyProfile></MyProfile>
            },
            {
                path:'myApplication',
                element:<MyApplication></MyApplication>
            },
            {
                path:'myReview',
                element:<MyReview></MyReview>
            },
            {
                path:'allReview',
                element:<AllReviews></AllReviews>
            },
            
        ]
    },
    {
        path:'*',
        element:<p>Page not found 404</p>
    }
])