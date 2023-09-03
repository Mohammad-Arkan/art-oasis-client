import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import {Helmet} from "react-helmet-async";

const Payment = () => {
  const {user} = useAuth();
  const {id} = useParams();
  const [axiosSecure] = useAxiosSecure();
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);
  const {data: selectedClass = [], refetch} = useQuery({
    queryKey: ["selectedClass", user?.email, id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/selected/class/${user?.email}/${id}`);
      return res.data;
    },
  });
  return (
    <div className="w-full px-5 min-h-screen">
      <Helmet>
        <title>Art Oasis | Payment</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center mt-24 mb-20">
        <span className="border-b-4 rounded-full px-10 py-2">
          Payment: ${selectedClass.price}
        </span>
      </h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={selectedClass.price} classInfo={selectedClass} />
      </Elements>
    </div>
  );
};

export default Payment;
