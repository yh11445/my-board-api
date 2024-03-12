import * as _ from "lodash";

interface PaginatorParams {
  totalCount: number;
  page: number;
  perPage?: number;
}

interface PaginatorResult {
  pageList: number[];
  page: number;
  prevPage: number;
  nextPage: number;
  startPage: number;
  lastPage: number;
  hasPrev: boolean;
  hasNext: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const PAGE_LIST_SIZE = 10;

const paginator = ({ totalCount, page, perPage = 10 }: PaginatorParams): PaginatorResult => {
  const PER_PAGE = perPage;
  const totalPage = Math.ceil(totalCount / PER_PAGE);

  let quotient = Math.floor(page / PAGE_LIST_SIZE);

  if (page % PAGE_LIST_SIZE === 0) {
    quotient -= 1;
  }
  const startPage = quotient * PAGE_LIST_SIZE + 1;

  const endPage = startPage + PAGE_LIST_SIZE - 1 < totalPage ? startPage + PAGE_LIST_SIZE - 1 : totalPage;
  const isFirstPage = page === 1;
  const isLastPage = page === totalPage;
  const hasPrev = page > 1;
  const hasNext = page < totalPage;
  const paginatorResult: PaginatorResult = {
    pageList: _.range(startPage, endPage + 1),
    page,
    prevPage: page - 1,
    nextPage: page + 1,
    startPage,
    lastPage: totalPage,
    hasPrev,
    hasNext,
    isFirstPage,
    isLastPage,
  };
  return paginatorResult;
};

export default paginator;
