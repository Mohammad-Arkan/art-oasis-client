import {useQuery} from "@tanstack/react-query";

const useApprovedClasses = () => {
  const {data: classes = []} = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await fetch(
        "http://ec2-54-224-233-65.compute-1.amazonaws.com:5000/approvedClasses"
      );
      return res.json();
    },
  });
  return [classes];
};

export default useApprovedClasses;
