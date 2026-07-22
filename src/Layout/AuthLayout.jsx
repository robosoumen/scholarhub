import React from 'react';
import Logo from '../Components/Logo/Logo';
import scholarship from '../assets/scholarship.jpg'
import { Outlet } from 'react-router';
const AuthLayout = () => {
    return (
        <div>
           <div className='w-[80px]'> <Logo></Logo></div>
            <div className='min-h-screen flex'>
                {/* login form */}
                <div className='flex-1 flex items-center justify-center'>
                    <Outlet></Outlet>
                </div>
                {/* image */}
                <div className='flex-1 items-center flex justify-center'>
                    <img src={scholarship} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;