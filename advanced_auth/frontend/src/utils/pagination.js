export const getButtons = (totalPages, page, gap) => {
  const start = Math.max(1, page - gap);
  const end = Math.min(totalPages, page + gap);
  const pages = [];

  if (start > 1) pages.push({ number: 1, text: "1" });
  if (start > 2) pages.push({ number: start - 1, text: "..." });

  for (let i = start; i <= end; ++i) {
    pages.push({ number: i, text: String(i) });
  }

  if (end < totalPages - 1) pages.push({ number: end + 1, text: "..." });
  if (end < totalPages)
    pages.push({ number: totalPages, text: String(totalPages) });

  return pages;
};

export const getTotalPages = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};
