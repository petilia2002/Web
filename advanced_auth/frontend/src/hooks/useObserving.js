import { useEffect, useRef } from "react";

export const useObserving = (ref, isLoaded, condition, cb) => {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (observerRef.current) observerRef.current.disconnect();

    const options = {
      rootMargin: "0px",
      threshold: 0,
    };

    const callback = (entries) => {
      if (entries[0].isIntersecting && condition) {
        cb();
      }
    };

    observerRef.current = new IntersectionObserver(callback, options);
    observerRef.current.observe(ref.current);
  }, [isLoaded]);
};

/*useEffect(() => {
  if (posts.length !== page * limit || isLimitChange) return;

  if (observerRef.current) observerRef.current.disconnect();

  const target = targetElement.current;

  const options = {
    rootMargin: "0px",
    threshold: 0,
  };

  const callback = (entries) => {
    if (entries[0].isIntersecting && page < totalPages) {
      setPage(page + 1);
    }
  };

  observerRef.current = new IntersectionObserver(callback, options);
  observerRef.current.observe(target);
}, [page, limit, isLimitChange, posts, totalPages, observerRef, targetElement]);*/
