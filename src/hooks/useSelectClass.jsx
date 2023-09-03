import {Navigate, useLocation, useNavigate} from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";

const useSelectClass = () => {
  const {user} = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectClass = (classInfo, refetch) => {
    if (user) {
      const {image, className, _id, price, instructorName, instructorEmail} =
        classInfo;
      const selectedClass = {
        className,
        classId: _id,
        price: parseInt(price),
        studentEmail: user.email,
        classImage: image,
        instructorName,
        instructorEmail,
      };

      axiosSecure.post("/selected/class", selectedClass).then((data) => {
        if (data.data.insertedId) {
          Swal.fire("Good job!", "Class Selected Successfully!", "success");
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Please Login, To Select The Class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state: {from: location}});
        }
      });
    }
  };

  return [handleSelectClass];
};

export default useSelectClass;
