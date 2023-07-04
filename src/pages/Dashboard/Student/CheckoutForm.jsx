import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useEffect, useState} from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {Helmet} from "react-helmet-async";
import Swal from "sweetalert2";
import moment from "moment";

const CheckoutForm = ({price, classInfo}) => {
  const stripe = useStripe();
  const {user} = useAuth();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardErr, setCardErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price) {
      axiosSecure.post("/create-payment-intent", {price}).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const {error} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardErr(error.message);
    } else {
      setCardErr("");
    }
    setProcessing(true);

    const {paymentIntent, error: confirmError} =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        classId: classInfo.classId,
        className: classInfo.className,
        classImage: classInfo.classImage,
        instructorName: classInfo.instructorName,
        instructorEmail: classInfo.instructorEmail,
        date: moment(new Date()).format("llll"),
        price,
      };

      axiosSecure.post("/payments", payment).then((res) => {
        if (res.data.insertResult.insertedId) {
          Swal.fire("Good job!", "Payment Completed Successfully!", "success");
          const classId = classInfo.classId;
          axiosSecure.patch(`/class/updateCount/${classId}`);
        }
      });
    }
  };
  return (
    <div className="w-2/3 mx-auto">
      <Helmet>
        <title>Art Oasis | Checkout</title>
      </Helmet>

      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-outline btn-sm my-5"
          type="submit"
          disabled={!stripe || !clientSecret || processing}>
          Confirm Payment
        </button>
      </form>
      {cardErr && <p className="text-red-600">{cardErr}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction Complete with Transaction Id: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
