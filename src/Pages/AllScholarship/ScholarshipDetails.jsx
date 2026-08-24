import { Link, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";

const ScholarshipDetails = () => {
  const { user } = useAuth();
  const studentEmail = user?.email;
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: scholarship = [], isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarship/${id}`);
      return res.data;
    },
  });

  const { data: applicationData, isLoading: appLoading } = useQuery({
    queryKey: ["application", studentEmail, id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/handle-button/${id}?email=${studentEmail}`);
      return res.data;
    },
    enabled: !!studentEmail && !!id,
  });

  if (isLoading || appLoading) return <p>Loading.......</p>;

  return (
    <div>
      <p>scholarship details</p>
      <h2>{scholarship.scholarshipName}</h2>
      <img src={scholarship.image} alt={scholarship.universityName} />
      <p>University: {scholarship.universityName}</p>
      <p>Country: {scholarship.country}</p>
      <p>City: {scholarship.city}</p>
      <p>Subject Category: {scholarship.subjectCategory}</p>
      <p>Degree: {scholarship.degree}</p>
      <p>Tuition Fees: {scholarship.tuitionFees}</p>
      <p>Application Fees: {scholarship.applicationFees}</p>
      <p>Deadline: {scholarship.deadline}</p>

      {applicationData?.applied ? (
        <button className="btn" disabled>
          Already Applied
        </button>
      ) : (
        <Link to={`/payment/${scholarship._id}`}>
          <button className="btn">Apply</button>
        </Link>
      )}
    </div>
  );
};

export default ScholarshipDetails;