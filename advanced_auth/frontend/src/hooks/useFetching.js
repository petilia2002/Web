import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetching = async (...args) => {
    try {
      setIsLoaded(false);
      setIsError(false);
      await callback(...args);
    } catch (e) {
      console.log(e.message, e.status);
      if (e.status === 401) {
        console.log("АВТОРИЗУЙТЕСЬ ЗАНОВО!!!");
      }
      setIsError(true);
    } finally {
      setIsLoaded(true);
    }
  };

  return [fetching, isLoaded, isError];
};
