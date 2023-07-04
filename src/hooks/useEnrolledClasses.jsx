import {useEffect, useState} from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useEnrolledClasses = () => {
  const {user} = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/payments/enrolled/${user?.email}`).then((res) => {
      setEnrolledClasses(res.data);
      setPayments(res.data);
    });
  }, []);
  return [enrolledClasses, payments];
};

export default useEnrolledClasses;
