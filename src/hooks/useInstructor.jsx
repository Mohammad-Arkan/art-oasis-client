import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useInstructor = () => {
  const {user, loading} = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryKey: ["isInstructor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
      return res.data.instructor;
    },
  });

  const {data: instructors = []} = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(
        "https://art-oasis-server.vercel.app/instructors"
      );
      return res.json();
    },
  });
  return [instructors, isInstructor, isInstructorLoading];
};

export default useInstructor;
