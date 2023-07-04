import {useQuery} from "@tanstack/react-query";
import {Navigate} from "react-router-dom";
const useApprovedClasses = () => {
  const {data: classes = []} = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await fetch(
        "https://art-oasis-server.vercel.app/approvedClasses"
      );
      return res.json();
    },
  });
  return [classes];
};

export default useApprovedClasses;
