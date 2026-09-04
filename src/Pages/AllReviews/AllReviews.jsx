import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews-get");
      return res.data;
    },
  });


  const handleReviewDelete = (review) => {
    axiosSecure.delete(`/reviews-delete/${review._id}`).then((res) => {
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
      <p>All Reviews : {reviews.length}</p>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, i) => (
                <tr key={review._id}>
                  <th>{i + 1}</th>
                  <td>{review.userName}</td>
                  <td>{review.scholarshipName}</td>
                  <td>{review.universityName}</td>
                  <td>{review.comment}</td>
                  <td>
                    <button
                      onClick={() => handleReviewDelete(review)}
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
    </div>
  );
};

export default AllReviews;
