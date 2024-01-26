class ApiSuccess {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  constructor(statusCode: number, message = "Success", data: any) {
    (this.statusCode = statusCode),
      (this.message = message),
      (this.data = data),
      (this.success = statusCode < 400);
  }
}

export { ApiSuccess };
