import {useQuery} from "@tanstack/react-query";

const useApprovedClasses = () => {
  const {data: classes = []} = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await fetch(
        "https://art-oasis-server.onrender.com/approvedClasses"
      );
      return res.json();
    },
  });
  return [classes];
};

export default useApprovedClasses;
