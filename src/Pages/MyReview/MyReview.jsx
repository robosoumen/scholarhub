import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const MyReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedReview, setSelectedReview] = useState(null);

  const editModalRef = useRef();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user.email}`);
      return res.data;
    },
  });

  console.log("vvvvvvvvvvv", reviews);

  const openEditModal = (review) => {
    setSelectedReview(review);
    editModalRef.current.showModal();
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.patch(`/reviews/${selectedReview._id}`, {
        comment: selectedReview.comment,
        rating: selectedReview.rating,
      });

      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Update ",
          text: "Update Successful",
          icon: "success",
        });
      }
      console.log(res.data);

      // modal close
      editModalRef.current.close();

      // selected review clear
      setSelectedReview(null);

      refetch();
    } catch (error) {
      console.error("Review update failed:", error);
    }
  };

  const handleDelete = (reviews) => {
    axiosSecure.delete(`/reviews-delete/${reviews._id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        Swal.fire({
          title: "Deleted ",
          text: "Delete Successful",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <p>Reviews are : {reviews.length}</p>
      {/* table */}
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Comment</th>
                <th>Review Date</th>
                <th>Ratings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, i) => (
                <tr key={review._id}>
                  <th>{i + 1}</th>
                  <th>{review.scholarshipName}</th>
                  <td>{review.universityName}</td>
                  <td>{review.comment}</td>
                  <td>{review.reviewDate}</td>
                  <td>{review.rating}</td>
                  <td>
                    <button
                      onClick={() => openEditModal(review)}
                      className="btn btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review)}
                      className="btn btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* edit modal */}
      <dialog ref={editModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">Edit Review</h3>

          {selectedReview && (
            <form onSubmit={handleUpdateReview}>
              {/* Scholarship Name */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Scholarship Name</span>
                </label>

                <input
                  type="text"
                  value={selectedReview.scholarshipName}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>

              {/* University Name */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">University Name</span>
                </label>

                <input
                  type="text"
                  value={selectedReview.universityName}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>

              {/* Comment */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Review</span>
                </label>

                <textarea
                  value={selectedReview.comment}
                  onChange={(e) =>
                    setSelectedReview({
                      ...selectedReview,
                      comment: e.target.value,
                    })
                  }
                  className="textarea textarea-bordered w-full"
                  rows="4"
                />
              </div>

              {/* Rating */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>

                <select
                  value={selectedReview.rating}
                  onChange={(e) =>
                    setSelectedReview({
                      ...selectedReview,
                      rating: Number(e.target.value),
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => editModalRef.current.close()}
                  className="btn"
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Update Review
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyReview;
