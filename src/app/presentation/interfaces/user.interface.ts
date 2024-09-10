export interface UserResponse {
  success: boolean;
  message: string;
  result:  UserModel[];
}

export interface UserModel {
  id:              number;
  name:            string;
  email:           string;
  password:        string;
  userName:        string;
  twoFactorSecret: null | string;
}
