export interface ModelResponse {
  data?: any;
  message?: string;
  code?: string;
  error?: {
    code?: string; message?: string;
  };
  meta?: {
    page: {
      page?: number; pageCount?: number; rows?: number; totalElements?: number;
    }
  }
}
