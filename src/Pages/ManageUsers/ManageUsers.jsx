import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = useAuth();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUser = (id, role) => {
    const updateInfo = { role: role };
    Swal.fire({
      title: "Are you sure?",
      text: `You are Making ${role}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes make ${role}`,
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.patch(`/users/${id}/role`, updateInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Confirmed!",
              text: `you make ${role}`,
              icon: "success",
            });
          }
        });
    });
  };

  const handleModerate = (id) => {
    handleUser(id, "moderator");
  };

  const handleAdmin = (id) => {
    handleUser(id, "admin");
  };

  const handleReject = (id) => {
    handleUser(id, "student");
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
        axiosSecure.delete(`/users/${id}/role`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "You delete the user.",
              icon: "success",
            });
          }
        });
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
                    {user.role === "moderator" ? (
                      <button
                        onClick={() => handleReject(user._id)}
                        className="btn btn-sm mx-1 bg-red-600"
                      >
                        <RiUserUnfollowFill />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleModerate(user._id)}
                        className="btn btn-sm bg-green-500"
                      >
                        <RiUserFollowFill />
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleReject(user._id)}
                        className="btn btn-sm mx-1 bg-red-600"
                      >
                        <RiUserUnfollowFill />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAdmin(user._id)}
                        className="btn btn-sm bg-green-500"
                      >
                        <RiUserFollowFill />
                      </button>
                    )}
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
