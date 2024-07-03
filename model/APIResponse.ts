type APIResponse<T = any> = {
  status: number;
  message: string;
  data: T | null;
};

export { APIResponse };
