// 从 Schema 推导出响应类型
export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

// 响应构建函数
export function createApiResponse<T>(
  data: T,
  message = 'success',
  code = 0,
): ApiResponse<T> {
  return {
    code,
    message,
    data,
  };
}

// 为 ts-rest 控制器准备的快捷返回对象（包含 status）
export function tsRestResponse<T>(
  data: T,
  status: number,
  message = 'success',
  code = 0,
) {
  return {
    status: status,
    body: createApiResponse(data, message, code),
  };
}
