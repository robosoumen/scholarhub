import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const detailsModalRef = useRef();
  const [detailsModal, setDetailsModal] = useState(null);
  const editModalRef = useRef();
  const [editData, setEditData] = useState(null);
  const queryClient = useQueryClient();

  //   review add karar
  const reviewModalRef = useRef();
  const [reviewData, setReviewData] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/application?email=${user.email}`);
      return res.data;
    },
  });

  const openDetailsModalRef = (application) => {
    detailsModalRef.current.showModal();
    console.log("yyyyyyyyyyyyyyyyyyyy", application);
    setDetailsModal(application);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedInfo = {
      universityName: editData.universityName,
      degree: editData.degree,
      scholarshipCategory: editData.scholarshipCategory,
      applicationFees: editData.applicationFees,
    };

    try {
      const res = await axiosSecure.patch(
        `/application/${editData._id}`,
        updatedInfo,
      );

      if (res.data.modifiedCount > 0) {
        queryClient.invalidateQueries(["applications", user?.email]);
        editModalRef.current.close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModalRef = (application) => {
    editModalRef.current.showModal();
    setEditData(application);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (application) => {
    axiosSecure
      .delete(`/applications-delete/${application._id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted ",
            text: "Deleted Successful",
            icon: "success",
          });
        }
      });
  };

  //   review modal open

  const openReviewModalRef = (application) => {
    reviewModalRef.current.showModal();
    setReviewData(application);
    setRating(0);
    setComment("");
  };

  //   review er submit handler funtion
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      return Swal.fire({
        title: "Rating Required",
        text: "Please select a star rating",
        icon: "warning",
      });
    }

    const reviewInfo = {
      applicationId: reviewData._id,
      scholarshipId: reviewData.scholarshipId,
      universityName: reviewData.universityName,
      scholarshipName:reviewData.scholarshipName,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user?.photoURL,
      rating,
      comment,
      reviewDate: new Date(),
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewInfo);

      if (res.data.insertedId) {
        reviewModalRef.current.close();
        Swal.fire({
          title: "Review Submitted",
          text: "Thank you for your feedback!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>Applications : {applications.length}</p>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>University Name</th>
                <th>University Address</th>
                <th>Feedback</th>
                <th>Subject Category</th>
                <th>Application Fees</th>
                <th>Application Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{application.universityName}</td>
                  <td>University address</td>
                  <td>
                    {application.feedback
                      ? application.feedback
                      : "No Feedback Yet"}
                  </td>
                  <td>{application.scholarshipCategory}</td>
                  <td>{application.applicationFees}</td>
                  <td>{application.applicationStatus}</td>
                  <td>
                    <button
                      onClick={() => openDetailsModalRef(application)}
                      className="btn btn-sm"
                    >
                      Details
                    </button>
                    {application.applicationStatus === "pending" && (
                      <button
                        onClick={() => openEditModalRef(application)}
                        className="btn btn-sm"
                      >
                        Edit
                      </button>
                    )}
                    {application.applicationStatus === "pending" &&
                      application.paymentStatus === "unpaid" && (
                        <button className="btn btn-sm">Pay</button>
                      )}
                    {application.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleDelete(application)}
                        className="btn btn-sm"
                      >
                        Delete
                      </button>
                    )}
                    {application.applicationStatus === "Completed" && (
                      <button
                        onClick={() => openReviewModalRef(application)}
                        className="btn btn-sm"
                      >
                        Add Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Details modal */}
      <dialog ref={detailsModalRef} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-xl border-b pb-2 mb-4">
            Application Details
          </h3>

          {detailsModal && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <div>
                <span className="font-semibold">University: </span>
                {detailsModal.universityName}
              </div>

              <div>
                <span className="font-semibold">Degree: </span>
                {detailsModal.degree}
              </div>

              <div>
                <span className="font-semibold">Category: </span>
                {detailsModal.scholarshipCategory}
              </div>

              <div>
                <span className="font-semibold">Applied On: </span>
                {new Date(detailsModal.applyDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>

              <div>
                <span className="font-semibold">Application Fees: </span>$
                {detailsModal.applicationFees}
              </div>

              <div>
                <span className="font-semibold">Service Charge: </span>$
                {detailsModal.serviceCharge}
              </div>

              <div>
                <span className="font-semibold">Application Status: </span>
                <span
                  className={`badge ${
                    detailsModal.applicationStatus === "Completed"
                      ? "badge-success"
                      : detailsModal.applicationStatus === "pending"
                        ? "badge-warning"
                        : "badge-neutral"
                  }`}
                >
                  {detailsModal.applicationStatus}
                </span>
              </div>

              <div>
                <span className="font-semibold">Payment Status: </span>
                <span
                  className={`badge ${
                    detailsModal.paymentStatus === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {detailsModal.paymentStatus}
                </span>
              </div>

              <div>
                <span className="font-semibold">Tracking ID: </span>
                {detailsModal.trackingId}
              </div>

              <div className="sm:col-span-2">
                <span className="font-semibold">Transaction ID: </span>
                <span className="break-all">{detailsModal.transactionId}</span>
              </div>

              <div>
                <span className="font-semibold">Applicant: </span>
                {detailsModal.userName}
              </div>

              <div>
                <span className="font-semibold">Email: </span>
                {detailsModal.userEmail}
              </div>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* edit modal */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-xl border-b pb-2 mb-4">
            Edit Application
          </h3>

          {editData && (
            <form
              onSubmit={handleEditSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="form-control">
                <label className="label">University Name</label>
                <input
                  type="text"
                  name="universityName"
                  value={editData.universityName}
                  onChange={handleEditChange}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">Degree</label>
                <select
                  name="degree"
                  value={editData.degree}
                  onChange={handleEditChange}
                  className="select select-bordered"
                >
                  <option value="diploma">Diploma</option>
                  <option value="honours">Honours</option>
                  <option value="masters">Masters</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">Scholarship Category</label>
                <input
                  type="text"
                  name="scholarshipCategory"
                  value={editData.scholarshipCategory}
                  onChange={handleEditChange}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">Application Fees</label>
                <input
                  type="number"
                  name="applicationFees"
                  value={editData.applicationFees}
                  onChange={handleEditChange}
                  className="input input-bordered"
                />
              </div>

              <div className="modal-action sm:col-span-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => editModalRef.current.close()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {/* review modal */}
      <dialog ref={reviewModalRef} className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-xl border-b pb-2 mb-4">Add Review</h3>

          {reviewData && (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <p className="text-sm text-gray-500">
                {reviewData.universityName}
              </p>

              {/* star rating */}
              <div className="form-control">
                <label className="label">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-3xl cursor-pointer"
                      style={{
                        color:
                          star <= (hoverRating || rating)
                            ? "#facc15"
                            : "#d1d5db",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* comment */}
              <div className="form-control">
                <label className="label">Comment</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => reviewModalRef.current.close()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyApplication;
