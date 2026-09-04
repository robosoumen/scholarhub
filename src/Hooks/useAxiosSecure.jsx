import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://scholarhub-server.vercel.app'
})

const useAxiosSecure = () => {
    const {user, logOut} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // backend e headers pathano (intercept kora) : request
        const interceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        // response er jonno intercept kora
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            const statusCode = error.status;
            if(statusCode === 401 || statusCode === 403){
                logOut()
                 .then(() => {
                    navigate('/login')
                })
            }

            return Promise.reject(error)
        })

        return () => {
            axiosSecure.interceptors.request.eject(interceptor);
            axiosSecure.interceptors.response.eject(resInterceptor)
        };

    }, [user, logOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;