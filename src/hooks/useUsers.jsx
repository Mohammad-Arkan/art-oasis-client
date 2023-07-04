import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import {useQuery} from "@tanstack/react-query";

const useUsers = () => {
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
  return [users, refetch];
};

export default useUsers;
