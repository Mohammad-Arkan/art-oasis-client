import {useQuery} from "@tanstack/react-query";
import useAuth from "./useAuth";
const useApprovedClasses = () => {
  const {user, loading} = useAuth();
  const {data: classes = []} = useQuery({
    queryKey: ["approvedClasses"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/approvedClasses");
      return res.json();
    },
  });
  return [classes];
};

export default useApprovedClasses;
