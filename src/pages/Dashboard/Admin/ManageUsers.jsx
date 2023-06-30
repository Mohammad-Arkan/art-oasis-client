import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const {user, loading} = useAuth();
  const {refetch, data: users = []} = useQuery({
    queryKey: ["users"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make This User Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire("Good job!", `${user.name} is an Admin Now`, "success");
            }
          });
      }
    });
  };

  const handleMakeInstructor = (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make This User Instructor!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
          method: "PATCH",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                "Good job!",
                `${user.name} is an Instructor Now`,
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <div className="w-full my-20">
      <h2 className="text-3xl font-semibold text-center">
        {" "}
        <span className="border-b-4 rounded-full px-10 py-2">Manage Users</span>
      </h2>
      <div className="overflow-x-auto my-14 mx-5">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.image} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <th className=" space-x-1 ">
                  <button
                    onClick={() => handleMakeInstructor(user)}
                    disabled={user.role === "instructor"}
                    className="btn btn-xs">
                    Make Instructor
                  </button>
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    disabled={user.role === "admin"}
                    className="btn btn-xs">
                    Make Admin
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
