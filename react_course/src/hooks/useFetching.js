import { useState } from "react";

export const useFetching = (callback) => {
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetching = async (...args) => {
    try {
      await callback(...args);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsPostsLoaded(true);
    }
  };

  return [fetching, isPostsLoaded, isError];
};
