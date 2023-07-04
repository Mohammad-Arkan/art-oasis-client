import React from "react";
import {Helmet} from "react-helmet-async";
import useClasses from "../../../hooks/useClasses";
import usePayments from "../../../hooks/usePayments";
import useUsers from "../../../hooks/useUsers";
import useApprovedClasses from "../../../hooks/useApprovedClasses";

const AdminPanel = () => {
  const [users] = useUsers();
  const [classes] = useApprovedClasses();
  const [payments] = usePayments();

  let revenue = 0;
  payments.map((payment) => (revenue = revenue + payment.price));

  return (
    <div className="w-full px-10">
      <Helmet>
        <title>Art Oasis | Admin Panel</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mt-20 lg:pl-10 lg:text-start text-center">
        🍁 Executive Dashbaord
      </h2>
      <div className="flex flex-wrap w-[88%] font-semibold gap-5 rounded mx-auto my-10 justify-center">
        <div className="border px-8 py-5 rounded-lg shadow-lg">
          <h3 className="text-lg">Total Users</h3>
          <span className="text-4xl">{users.length}</span>
        </div>
        <div className="border px-8 py-5 rounded-lg shadow-lg">
          <h3 className="text-lg">Total Courses</h3>
          <span className="text-4xl">{classes.length}</span>
        </div>
        <div className="border px-8 py-5 rounded-lg shadow-lg">
          <h3 className="text-lg">Total Enrolled</h3>
          <span className="text-4xl">{payments.length}</span>
        </div>
        <div className="border px-5 py-5 rounded-lg shadow-lg">
          <h3 className="text-lg">Estimated Earnings</h3>
          <span className="text-4xl">${revenue}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
