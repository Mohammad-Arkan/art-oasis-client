import {useQuery} from "@tanstack/react-query";
import React from "react";

const Classes = () => {
  const {data: classes = []} = useQuery({
    queryKey: ["approvedClasses"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/approvedClasses");
      return res.json();
    },
  });
  return <div></div>;
};

export default Classes;
