import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import {useQuery} from "@tanstack/react-query";

const usePayments = () => {
  const [axiosSecure] = useAxiosSecure();
  const {user, loading} = useAuth();
  const {refetch, data: payments = []} = useQuery({
    queryKey: ["payments"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure("/payments");
      return res.data;
    },
  });
  return [payments, refetch];
};

export default usePayments;
