export type PagingAndSearchOptions = {
  q?: string;
  order: "ASC" | "DESC";
  page?: number;
  per_page?: number;
  sort?: string;
  columns: string[];
  path: string;
  raw?: boolean;
  skipTake?: boolean;
  defaultSort: { sort: string; order: "ASC" | "DESC" };
};
