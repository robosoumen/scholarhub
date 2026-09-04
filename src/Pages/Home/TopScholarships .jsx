import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaGraduationCap, FaArrowRight } from "react-icons/fa";

const TopScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarship");

      // Most recent 6 scholarships
      const sortedScholarships = [...res.data]
        .sort((a, b) => {
          return new Date(b.postDate) - new Date(a.postDate);
        })
        .slice(0, 6);

      return sortedScholarships;
    },
  });

  const handleSeeDetails = (id) => {
    navigate(`/scholarship/${id}`);
  };

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-base-200 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2 text-primary">
            <FaGraduationCap />
            <span className="font-semibold uppercase tracking-wider">
              Featured Opportunities
            </span>
          </div>

          <h2 className="text-3xl font-bold md:text-4xl">Top Scholarships</h2>

          <p className="mx-auto mt-4 max-w-2xl text-base-content/70">
            Explore the latest scholarship opportunities and find the perfect
            funding option for your education.
          </p>
        </motion.div>

        {/* Scholarship Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="card overflow-hidden border border-base-300 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <figure className="h-52 overflow-hidden">
                <img
                  src={scholarship.image}
                  alt={scholarship.universityName}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </figure>

              {/* Content */}
              <div className="card-body">
                <h2 className="card-title line-clamp-2">
                  {scholarship.scholarshipName}
                </h2>

                <p className="font-medium text-primary">
                  {scholarship.universityName}
                </p>

                <div className="mt-2 space-y-1 text-sm text-base-content/70">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {scholarship.subjectCategory}
                  </p>

                  <p>
                    <span className="font-semibold">Degree:</span>{" "}
                    {scholarship.degree}
                  </p>

                  <p>
                    <span className="font-semibold">Application Fee:</span> ₹
                    {scholarship.applicationFees}
                  </p>
                </div>

                {/* Button */}
                <div className="card-actions mt-4">
                  <button
                    onClick={() => handleSeeDetails(scholarship._id)}
                    className="btn btn-primary w-full rounded-xl"
                  >
                    View Details
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/allScholarShip")}
            className="btn btn-outline btn-primary rounded-xl px-8"
          >
            View All Scholarships
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;
