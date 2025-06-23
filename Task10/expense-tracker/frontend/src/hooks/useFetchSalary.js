import { useEffect, useState } from "react";
import { fetchSalary } from "../api/salary";

export const useFetchSalary = () => {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalary()
      .then((res) => setSalary(res.data.salary))
      .catch(() => setSalary(null))
      .finally(() => setLoading(false));
  }, []);

  return { salary, setSalary, loading };
};
