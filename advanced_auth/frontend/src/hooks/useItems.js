import { useMemo } from "react";

export const useSortedItems = (sort, items) => {
  const sortedItems = useMemo(() => {
    if (sort) {
      return [...items].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return items;
  }, [sort, items]);
  return sortedItems;
};

export const useItems = (sort, field, query, items) => {
  const sortedItems = useSortedItems(sort, items);
  const sortedAndSearchedItems = useMemo(() => {
    return sortedItems.filter((item) =>
      item[field].toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query, sortedItems]);
  return sortedAndSearchedItems;
};
