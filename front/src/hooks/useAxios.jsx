import { useCallback, useState } from "react";
import api from "../lib/axiosApi.js";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (options) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api(options); // option : url: nd, method:"dn",data:"wj"
      return res.data;
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchData, loading, error };
};

export default useAxios;
