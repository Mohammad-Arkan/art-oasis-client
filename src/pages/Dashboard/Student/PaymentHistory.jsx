import React from "react";
import {Helmet} from "react-helmet-async";
import useEnrolledClasses from "../../../hooks/useEnrolledClasses";
import moment from "moment/moment";

const PaymentHistory = () => {
  const [payments] = useEnrolledClasses();
  return (
    <div className="w-full">
      <Helmet>
        <title>Art Oasis | Payment History</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center mt-24 mb-20">
        <span className="border-b-4 rounded-full px-10 py-2">
          Payment History
        </span>
      </h2>
      <div className="overflow-x-auto my-14 mx-5">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Transaction ID</th>
              <th>Purchased Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="font-bold">{payment.className}</div>
                </td>
                <td>{payment.transactionId}</td>

                <td>{moment(payment.date).format("MMM Do YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
