import { useMemo, useState } from 'react';

interface IPagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

export const usePagination = () => {
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    pageSize: 100,
    total: 0,
  });

  const totalPages = useMemo(() => {
    if (pagination.pageSize <= 0) return 0;
    return Math.ceil(pagination.total / pagination.pageSize);
  }, [pagination.total, pagination.pageSize]);

  return {
    pagination,
    setPagination,
    totalPages,
  };
};
