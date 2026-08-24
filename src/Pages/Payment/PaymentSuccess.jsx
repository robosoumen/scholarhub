import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const axiosSecure = useAxiosSecure();

    const sessionId = searchParams.get('session_id');
    console.log(sessionId)

    useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log('session id is --',res.data)
                setPaymentInfo({
                    transactionId : res.data.transactionId,
                    trackingId : res.data.trackingId,
                    scholarshipId : res.data.scholarshipId
                })
            })
        }
    }, [sessionId, axiosSecure])

    const {data:scholarship = []} = useQuery({
        queryKey:['scholarship'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/success-page/${paymentInfo.scholarshipId}`);
            return res.data
        }
    })

    console.log('from succes page , scholarship', scholarship)

    return (
        <div>
            <p>payment success</p>
            <p>Your transaction id : {paymentInfo.transactionId}</p>
            <p>Your tracking Id : {paymentInfo.trackingId}</p>

            <p>
                {scholarship.userName} your application for {scholarship.universityName} successful
            </p>
            <p>applicationStatus : {scholarship.applicationStatus}</p>
        </div>
    );
};

export default PaymentSuccess;