import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import {useQuery} from "@tanstack/react-query";

const useStudent = () => {
  const {user, loading} = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {data: isStudent, isLoading: isStudentLoading} = useQuery({
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryKey: ["isStudent", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/student/${user?.email}`);
      console.log(res.data.student);
      return res.data.student;
    },
  });
  return [isStudent, isStudentLoading];
};

export default useStudent;
