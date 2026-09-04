import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SuccessStories = () => {
  const axiosSecure = useAxiosSecure();

  const { data: testimonials = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews-get-testimonial");
      return res.data;
    },
  });

  return (
    <section className="bg-base-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Success Stories
          </span>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Students Who Found Their Opportunity
          </h2>

          <p className="mt-4 text-base text-base-content/60">
            Discover how ScholarHub has helped students find scholarship
            opportunities and move closer to their academic goals.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Quote Icon */}
              <div className="absolute right-6 top-6 text-3xl text-primary/15">
                <FaQuoteLeft />
              </div>

              {/* Stars */}
              <div className="mb-5 flex gap-1 text-warning">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <FaStar key={index} size={15} />
                ))}
              </div>

              {/* Message */}
              <p className="min-h-[120px] text-sm leading-7 text-base-content/70">
                "{testimonial.comment}"
              </p>

              {/* User */}
              <div className="mt-6 flex items-center gap-4 border-t border-base-300 pt-5">
                <div className="avatar">
                  <div className="h-12 w-12 rounded-full ring-2 ring-primary/20 ring-offset-2">
                    <img
                      src={testimonial.userImage}
                      alt={testimonial.userName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold">{testimonial.userName}</h3>
                  <p className="text-xs text-base-content/50">
                    {testimonial.scholarshipName}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
