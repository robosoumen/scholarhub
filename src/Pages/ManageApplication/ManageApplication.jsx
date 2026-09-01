import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const ManageApplication = () => {
  const axiosSecure = useAxiosSecure();
  const applicationModalRef = useRef();
  const feedbackModalRef = useRef();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [feedback, setFeedback] = useState("");

  const { data: scholarship = [] } = useQuery({
    queryKey: ["scholarshipDetails", selectedApplication?.scholarshipId],
    enabled: !!selectedApplication?.scholarshipId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarship/${selectedApplication.scholarshipId}`,
      );
      return res.data;
    },
  });

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const openApplicationModal = (application) => {
    setSelectedApplication(application);
    applicationModalRef.current.showModal();
  };

  const openFeedbackModal = (application) => {
    setSelectedApplication(application);
    setFeedback("");
    feedbackModalRef.current.showModal();
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      return;
    }

    try {
      const res = await axiosSecure.patch(
        `/applications/${selectedApplication._id}`,
        {
          feedback: feedback,
        },
      );
      refetch()
      console.log(res.data);

      // modal close
      feedbackModalRef.current.close();

      // input clear
      setFeedback("");
    } catch (error) {
      console.error("Feedback update failed:", error);
    }
  };

  //   handle status button function
  const handleStatusChange = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to changed the application status",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `yes ${status} it`,
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure
          .patch(`/applications/${id}`, {
            applicationStatus: status,
          })
          .then((res) => {
            if (res.data.modifiedCount) {
                refetch()
              Swal.fire({
                title: `${status} Done`,
                text: `Application Status has been ${status}`,
                icon: "success",
              });
            }
          });
    });
  };

  return (
    <div>
      <p>all application are {applications.length}</p>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Application Name</th>
                <th>Application Email</th>
                <th>University Name</th>
                <th>Application Feedback</th>
                <th>Application Status</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, i) => (
                <tr key={application._id}>
                  <th>{i + 1}</th>
                  <td>{application.universityName}</td>
                  <td>{application.userEmail}</td>
                  <td>{application.universityName}</td>
                  <td>{application.feedback}</td>
                  <td>{application.applicationStatus}</td>
                  <td>{application.paymentStatus}</td>
                  <td>
                    <button
                      onClick={() => openApplicationModal(application)}
                      className="btn btn-primary btn-sm"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => openFeedbackModal(application)}
                      className="btn btn-primary btn-sm mx-1 my-1"
                    >
                      Feedback
                    </button>
                    <div className="dropdown dropdown-start">
                      <div tabIndex={0} role="button" className="btn m-1">
                        Change Status
                      </div>
                      <ul
                        tabIndex={-1}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li>
                          <button
                            onClick={() =>
                              handleStatusChange(application._id, "Processing")
                            }
                            className="btn my-1"
                          >
                            Processing
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleStatusChange(application._id, "completed")
                            }
                            className="btn"
                          >
                            Completed
                          </button>
                        </li>
                      </ul>
                    </div>
                    <button
                      className="btn btn-error btn-sm mx-1 my-1"
                      onClick={() =>
                        handleStatusChange(application._id, "Cancelled")
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* modal */}
      {/* Application Details Modal */}
      <dialog
        ref={applicationModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-3xl p-0">
          {/* Modal Header */}
          <div className="bg-primary text-primary-content px-6 py-4">
            <h3 className="font-bold text-xl">Application Details</h3>
            <p className="text-sm opacity-80">
              Student and scholarship information
            </p>
          </div>

          {selectedApplication && scholarship && (
            <div className="p-6 space-y-6">
              {/* ================= STUDENT INFORMATION ================= */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-xl">👨‍🎓</div>
                  <h4 className="font-bold text-lg">Student Information</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Student Name</p>
                    <p className="font-semibold">
                      {selectedApplication.userName}
                    </p>
                  </div>

                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold break-all">
                      {selectedApplication.userEmail}
                    </p>
                  </div>

                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">University</p>
                    <p className="font-semibold">
                      {selectedApplication.universityName}
                    </p>
                  </div>

                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Degree</p>
                    <p className="font-semibold capitalize">
                      {selectedApplication.degree}
                    </p>
                  </div>

                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Application Date</p>
                    <p className="font-semibold">
                      {new Date(
                        selectedApplication.applyDate,
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Application ID</p>
                    <p className="font-semibold text-xs break-all">
                      {selectedApplication._id}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= SCHOLARSHIP INFORMATION ================= */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-xl">🎓</div>
                  <h4 className="font-bold text-lg">Scholarship Information</h4>
                </div>

                <div className="border rounded-xl p-4">
                  {/* Scholarship Image + Name */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-5">
                    <img
                      src={scholarship.image}
                      alt={scholarship.scholarshipName}
                      className="w-full sm:w-32 h-24 object-cover rounded-lg"
                    />

                    <div>
                      <h5 className="font-bold text-lg">
                        {scholarship.scholarshipName}
                      </h5>

                      <p className="text-sm text-gray-500">
                        {scholarship.universityName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {scholarship.city}, {scholarship.country}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Scholarship Category
                      </p>
                      <p className="font-semibold capitalize">
                        {scholarship.scholarshipCategory}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Subject Category</p>
                      <p className="font-semibold">
                        {scholarship.subjectCategory}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Degree</p>
                      <p className="font-semibold capitalize">
                        {scholarship.degree}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">World Rank</p>
                      <p className="font-semibold">#{scholarship.WorldRank}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-semibold">{scholarship.country}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-semibold">{scholarship.city}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Application Deadline
                      </p>
                      <p className="font-semibold">{scholarship.deadline}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Scholarship Post Date
                      </p>
                      <p className="font-semibold">
                        {new Date(
                          scholarship.scholarshipPostDate,
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= FEES & PAYMENT ================= */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-xl">💰</div>
                  <h4 className="font-bold text-lg">Fees & Payment</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Application Fee</p>
                    <p className="font-bold text-lg">
                      ₹{selectedApplication.applicationFees}
                    </p>
                  </div>

                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Service Charge</p>
                    <p className="font-bold text-lg">
                      ₹{selectedApplication.serviceCharge}
                    </p>
                  </div>

                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Tuition Fee</p>
                    <p className="font-bold text-lg">
                      ₹{scholarship.tuitionFees}
                    </p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="mt-4 border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Payment Status</span>

                    <span className="badge badge-success">
                      {selectedApplication.paymentStatus}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Transaction ID</span>

                    <span className="font-medium text-xs break-all text-right">
                      {selectedApplication.transactionId}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Tracking ID</span>

                    <span className="font-medium text-xs break-all text-right">
                      {selectedApplication.trackingId}
                    </span>
                  </div>
                </div>
              </div>

              {/* ================= APPLICATION STATUS ================= */}
              <div className="border rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Application Status</p>

                    <p className="font-bold text-lg capitalize">
                      {selectedApplication.applicationStatus}
                    </p>
                  </div>

                  <div>
                    <span className="badge badge-warning badge-lg">
                      {selectedApplication.applicationStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* ================= CLOSE BUTTON ================= */}
              <div className="modal-action mt-2">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </dialog>
      {/* feedback given modal */}
      <dialog
        ref={feedbackModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-lg">
          {/* Header */}
          <div className="mb-5">
            <h3 className="font-bold text-2xl">Give Feedback</h3>

            <p className="text-sm text-gray-500 mt-1">
              Provide feedback for this student's application
            </p>
          </div>

          {selectedApplication && (
            <div>
              {/* Student Information */}
              <div className="bg-base-200 rounded-lg p-4 mb-5">
                <p className="text-sm text-gray-500">Student</p>

                <p className="font-semibold text-lg">
                  {selectedApplication.userName}
                </p>

                <p className="text-sm text-gray-500">
                  {selectedApplication.userEmail}
                </p>

                <p className="text-sm mt-2">
                  Application ID:
                  <span className="font-medium ml-1">
                    {selectedApplication._id}
                  </span>
                </p>
              </div>

              {/* Feedback Input */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Feedback</span>
                </label>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Write your feedback for this application..."
                />
              </div>

              {/* Buttons */}
              <div className="modal-action">
                {/* Close */}
                <form method="dialog">
                  <button type="submit" className="btn btn-outline">
                    Cancel
                  </button>
                </form>

                {/* Submit */}
                <button
                  onClick={handleFeedbackSubmit}
                  className="btn btn-primary"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageApplication;
