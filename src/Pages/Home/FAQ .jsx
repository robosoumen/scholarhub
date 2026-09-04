import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "What is ScholarHub?",
    answer:
      "ScholarHub is a scholarship platform that helps students discover scholarship opportunities, view detailed information, and apply for scholarships easily.",
  },
  {
    id: 2,
    question: "How can I find a suitable scholarship?",
    answer:
      "You can visit the All Scholarships page and browse available scholarships. You can also use the search and filtering options to find scholarships based on your requirements.",
  },
  {
    id: 3,
    question: "Do I need an account to apply for a scholarship?",
    answer:
      "Yes. You need to create a ScholarHub account and log in before you can apply for a scholarship.",
  },
  {
    id: 4,
    question: "Can I track my scholarship applications?",
    answer:
      "Yes. After logging in, you can visit your Dashboard to view your applications and track their current status.",
  },
  {
    id: 5,
    question: "Is there an application fee?",
    answer:
      "Some scholarships may require an application fee. The applicable fee will be clearly displayed on the scholarship details page before you apply.",
  },
  {
    id: 6,
    question: "How can I contact ScholarHub?",
    answer:
      "You can contact the ScholarHub team through the contact information provided on the platform. We are happy to help with your questions.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-base-200 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FaQuestionCircle size={28} />
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-base text-base-content/60">
            Find answers to some of the most common questions about ScholarHub
            and scholarship applications.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100 shadow-sm"
            >
              <input
                type="radio"
                name="scholarhub-faq"
                defaultChecked={index === 0}
              />

              <div className="collapse-title pr-12 text-base font-semibold">
                {faq.question}
              </div>

              <div className="collapse-content">
                <p className="border-t border-base-300 pt-4 text-sm leading-7 text-base-content/60">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;