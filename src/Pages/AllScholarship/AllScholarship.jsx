import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useState } from "react";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('')

  const { data: scholarships = [] } = useQuery({
    queryKey: ["scholarshipIs", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarship?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleSeeDetails = (id) => {
    navigate(`/scholarship/${id}`);
  };
  return (
    <div>
      <p>All Scholarship : {scholarships.length}</p>
      <p>Search Text : {searchText}</p>
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input onChange={(e) => setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />
      </label>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="card bg-base-100 w-96 shadow-sm"
          >
            <figure className="px-10 pt-10">
              <img
                src={scholarship.image}
                alt={scholarship.universityName}
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Name of Scholarship : {scholarship.scholarshipName}
              </h2>
              <p>Category Of Scholarship : {scholarship.subjectCategory}</p>
              <div className="card-actions">
                <button
                  onClick={() => handleSeeDetails(scholarship._id)}
                  className="btn btn-primary"
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
