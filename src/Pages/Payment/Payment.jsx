import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Payment = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log("from payment page", id);

  const { data: scholarship = [] } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarship/${id}`);
      return res.data;
    },
  });

  console.log("in payment page", scholarship);

  const handlePayment = async () => {
    const paymentInfo = {
      scholarshipId: scholarship._id,
      // userId : 
      userName : user?.displayName,
      userEmail: user?.email,
      universityName : scholarship.universityName,
      scholarshipCategory : scholarship.scholarshipCategory,
      degree :scholarship.degree,
      applicationFees: scholarship.applicationFees,
      serviceCharge :scholarship.serviceCharge ,
      // applicationStatus : ,
      // paymentStatus : ,
      // applicationDate : ,
      // feedback : ,
      scholarshipName: scholarship.scholarshipName,
    };
    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );
      console.log(res.data);
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Payment error:", error.response?.data);
    }
  };
  return (
    <div>
      <p>payment page : {scholarship.scholarshipName}</p>
      <button onClick={handlePayment} className="btn btn-primary">
        please pay
      </button>
    </div>
  );
};

export default Payment;
