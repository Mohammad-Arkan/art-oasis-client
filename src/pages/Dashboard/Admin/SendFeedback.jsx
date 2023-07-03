import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";
import {Helmet} from "react-helmet-async";

const SendFeedback = () => {
  const {id} = useParams();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  const {data: classInfo = []} = useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      return res.data;
    },
  });

  const handleSendFeedback = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;

    axiosSecure.patch(`/instructor/class/${id}`, {feedback}).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Good job!", `Feedback Sent Successfully`, "success");
        navigate("/dashboard/manage-classes");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Art Oasis | Send Feedback</title>
      </Helmet>
      <div className="flex flex-col items-center mt-10">
        <h2 className="font-semibold my-3">
          [ Write Feedback To {classInfo.className} ]
        </h2>
        <form onSubmit={handleSendFeedback} className="md:w-2/3 w-10/12">
          <textarea
            name="feedback"
            className="textarea textarea-accent w-full textarea-bordered font-semibold"
            placeholder="Write Feedback"></textarea>
          <input
            type="submit"
            value={"Send Feedback"}
            className="btn btn-sm my-1"
          />
        </form>
      </div>
    </>
  );
};

export default SendFeedback;
