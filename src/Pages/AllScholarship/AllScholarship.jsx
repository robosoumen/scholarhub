import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [] } = useQuery({
    queryKey: ["scholarship"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarship");
      return res.data;
    },
  });
  return (
    <div>
      <p>All Scholarship : {scholarships.length}</p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {scholarships.map((scholarship) => (
         <div key={scholarship._id} className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10">
              <img
                src={scholarship.image}
                alt={scholarship.universityName}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Name of Scholarship : {scholarship.scholarshipName}</h2>
              <p>
               Category Of Scholarship : {scholarship.subjectCategory}
              </p>
              <div className="card-actions">
                <button className="btn btn-primary">Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
