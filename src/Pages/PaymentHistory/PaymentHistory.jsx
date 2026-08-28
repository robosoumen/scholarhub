import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

export const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: payments = [] } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if(loading){
    return <div>
        <p>Loading due to payment page user .....................</p>
    </div>
  }

  return (
    <div>
      <p>payments done {payments.length}</p>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>University</th>
              <th>Payment Status</th>
              <th>Application Status</th>
              <th>Tracking Id</th>
              <th>Transaction Id</th>
              <th>Apply date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{payment.userName}</td>
                <td>{payment.universityName}</td>
                <td>{payment.paymentStatus}</td>
                <td>{payment.applicationStatus}</td>
                <td>{payment.trackingId}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.applyDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
