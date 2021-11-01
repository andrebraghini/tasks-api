import { UserInputError, AuthenticationError } from 'apollo-server-errors';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { env } from '../env';

export class AuthService {
  protected instance: AxiosInstance;

  constructor() {
    const options: AxiosRequestConfig = {
      baseURL: env.AUTH_SERVICE_URL
    };
    this.instance = axios.create(options);
  }

  login(username: string, password: string) {
    const bodyRequest = { username, password };
    return this.instance.post(`/login`, bodyRequest)
      .then(response => response.data)
      .catch(this.errorHandler.bind(this));
  }

  signUp(username: string, password: string) {
    const bodyRequest = { username, password };
    return this.instance.post(`/sign-up`, bodyRequest)
      .then(response => response.data)
      .catch(this.errorHandler.bind(this));
  }

  private errorHandler(error: AxiosError) {
    if (error.response?.status === 400) {
      throw new UserInputError(error.response.data?.error?.message, error.response.data?.error?.details);
    }
    if ([401, 403].includes(error.response?.status || 0)) {
      throw new AuthenticationError(error.response?.data?.error?.message || 'Invalid credentials');
    }
    throw error;
  }
}