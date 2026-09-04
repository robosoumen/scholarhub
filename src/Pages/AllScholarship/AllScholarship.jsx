import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useState } from "react";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const { data: scholarships = [] } = useQuery({
    queryKey: ["scholarshipIs", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarship?searchText=${searchText}`,
      );
      return res.data;
    },
  });

  const handleSeeDetails = (id) => {
    navigate(`/scholarship/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🎓 All Scholarships
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Discover your dream scholarship opportunities
          </p>
          <div className="badge badge-primary badge-lg mt-2">
            {scholarships.length} Scholarships Available
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="search"
              placeholder="Search by Scholarship Name, University, or Degree..."
              className="w-full pl-12 pr-4 py-4 text-base rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white shadow-md hover:shadow-lg outline-none"
              value={searchText}
            />
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Scholarships Grid */}
        {scholarships.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700">
              No scholarships found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <img
                    src={
                      scholarship.image ||
                      "https://via.placeholder.com/400x250?text=University"
                    }
                    alt={scholarship.universityName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-600 shadow-md">
                      {scholarship.category || "Scholarship"}
                    </span>
                  </div>
                  {/* Location Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-4 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-sm font-medium text-white flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {scholarship.location || "Global"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* University Name */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800 truncate flex-1">
                      {scholarship.universityName}
                    </h3>
                  </div>

                  {/* Scholarship Name */}
                  <p className="text-sm font-medium text-blue-600 mb-3 line-clamp-1">
                    {scholarship.scholarshipName}
                  </p>

                  {/* Details */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold text-gray-700 min-w-[100px]">
                        Category:
                      </span>
                      <span className="text-gray-600">
                        {scholarship.subjectCategory || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold text-gray-700 min-w-[100px]">
                        Application Fee:
                      </span>
                      <span
                        className={`font-medium ${scholarship.applicationFees ? "text-red-500" : "text-green-500"}`}
                      >
                        {scholarship.applicationFees
                          ? `$${scholarship.applicationFees}`
                          : "Free"}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleSeeDetails(scholarship._id)}
                    className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                  >
                    View Details
                    <svg
                      className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllScholarship;
