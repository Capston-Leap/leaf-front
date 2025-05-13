export interface RegisterUserRequest {
  loginId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  birth: string;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}
