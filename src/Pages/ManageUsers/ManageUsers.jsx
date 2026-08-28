import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUser = (id, role) => {
    const updateInfo = { role: role };
    axiosSecure.patch(`/users/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleModerate = (id) => {
    handleUser(id, "moderator");
  };

  const handleAdmin = (id) => {
    handleUser(id, "admin");
  };

  const handleReject = (id) => {
    handleUser(id, "user");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/users/${id}`)
      .then((res) => {
        if(res.data.deletedCount){
          refetch();
          Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        }
      })
    });
  };

  return (
    <div>
      <p>users is : {users.length}</p>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>PhotoUrl</th>
                <th>Role</th>
                <th>Date</th>
                <th>Moderator Action</th>
                <th>Admin Action</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      className="h-[40px] w-[40px] rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </td>
                  <td>{user.role}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button
                      onClick={() => handleModerate(user._id)}
                      className="btn btn-sm"
                    >
                      <RiUserFollowFill />
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      className="btn btn-sm mx-1"
                    >
                      <RiUserUnfollowFill />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAdmin(user._id)}
                      className="btn btn-sm"
                    >
                      <RiUserFollowFill />
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      className="btn btn-sm mx-1"
                    >
                      <RiUserUnfollowFill />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-sm"
                    >
                      <FaTrash />
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

export default ManageUsers;
