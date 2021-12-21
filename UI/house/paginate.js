
export const reducer = (page, action) => {
  const pages = Math.ceil(
    action.totalResult.length / process.env.NEXT_PUBLIC_RESULT_PER_PAGE
  );

  if (action.page === 1 && pages > 1) {
    return {
      start: (action.page - 1) * process.env.NEXT_PUBLIC_RESULT_PER_PAGE,
      end: action.page * process.env.NEXT_PUBLIC_RESULT_PER_PAGE,
      page: action.page,
      type: 'next',
    };
  }
  if (action.page < pages) {
    return {
      start: (action.page - 1) * process.env.NEXT_PUBLIC_RESULT_PER_PAGE,
      end: action.page * process.env.NEXT_PUBLIC_RESULT_PER_PAGE,
      page: action.page,
      type: 'both',
    };
  }
  if (action.page === pages && pages > 1) {
    return {
      start: (action.page - 1) * process.env.NEXT_PUBLIC_RESULT_PER_PAGE,
      end: action.page * process.env.NEXT_PUBLIC_RESULT_PER_PAGE,
      page: action.page,
      type: 'prev',
    };
  }

  return page;
};
