export interface ApiResponse<T> {
  meta: {
    message: string;
    code: number;
  };
  data: T;
}