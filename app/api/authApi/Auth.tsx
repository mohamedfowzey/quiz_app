import axiosClient from "../AxiosClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgetPasswordData {
  email: string;
} 
export interface ResetPasswordData {
  email: string;
  password: string;
  otp: string;
};

export interface ChangePasswordData {
  password: string;
  password_new: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export const apiLogin = (data: LoginData) => {
  return axiosClient.post("/api/auth/login", data);
};

export const apiRegister = (data: RegisterData) => {
  return axiosClient.post("/api/auth/register", data);
};

export const apiForgetPassword = (data: ForgetPasswordData) => {
  return axiosClient.post("/api/auth/forgot-password", data);
};

export const apiReset = (data: ResetPasswordData) => {
  return axiosClient.post("/api/auth/reset-password", data);
};

export const apichangePassword = (data: ChangePasswordData) => {
  return axiosClient.post("/api/auth/change-password", data);
};
