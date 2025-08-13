import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      setIsError(false);
      await callback(...args);
    } catch (e) {
      console.log(e.message, e.status);
      if (e.status === 401) {
        console.log("АВТОРИЗУЙТЕСЬ ЗАНОВО!!!");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, isError];
};
