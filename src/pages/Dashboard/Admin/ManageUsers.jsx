import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {useQuery} from "@tanstack/react-query";

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
  return (
    <div className="w-full my-20">
      <h2 className="text-3xl font-semibold text-center">Manage Users</h2>
      <div className="overflow-x-auto my-10 mx-5">
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
                  <button className="btn btn-xs">Make Instructor</button>
                  <button className="btn btn-xs">Make Admin</button>
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
