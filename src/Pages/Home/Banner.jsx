import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaSearch, FaGraduationCap } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-base-200">
      {/* Background Decoration */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"></div>

      <div className="relative mx-auto grid min-h-[600px] max-w-7xl items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          {/* Small Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
          >
            <FaGraduationCap />
            Discover Your Opportunity
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Find the Right{" "}
            <span className="text-primary">Scholarship</span>
            <br />
            for Your Future
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-base-content/60 sm:text-lg lg:mx-0"
          >
            Explore scholarship opportunities from universities and
            organizations around the world. Find financial support and take
            the next step toward achieving your academic goals.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <Link
              to="/allScholarShip"
              className="btn btn-primary rounded-xl px-7 text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <FaSearch />
              Search Scholarships
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full bg-primary/10 sm:h-[400px] sm:w-[400px]"
          >
            {/* Main Circle */}
            <div className="flex h-[240px] w-[240px] items-center justify-center rounded-full bg-primary/15 sm:h-[300px] sm:w-[300px]">
              <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full bg-primary text-primary-content shadow-2xl sm:h-[220px] sm:w-[220px]">
                <FaGraduationCap className="text-[90px] sm:text-[120px]" />
              </div>
            </div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-2 top-12 rounded-2xl bg-base-100 px-4 py-3 shadow-xl sm:-left-8"
            >
              <p className="text-xs text-base-content/50">
                Scholarships
              </p>
              <p className="text-lg font-bold text-primary">1000+</p>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-2 -right-2 rounded-2xl bg-base-100 px-4 py-3 shadow-xl sm:-right-8"
            >
              <p className="text-xs text-base-content/50">
                Opportunities
              </p>
              <p className="text-lg font-bold text-primary">Global</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;