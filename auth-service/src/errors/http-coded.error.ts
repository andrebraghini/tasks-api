export class HttpCodedError {

  constructor(
    public statusCode: number,
    public message?: string,
    public code?: string,
    public details?: any
  ) {}

  toJSON() {
    return {
      ...(this.message && { message: this.message }),
      ...(this.code && { code: this.code }),
      ...(this.details && { details: this.details }),
    }
  }

}
