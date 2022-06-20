export interface IUser {
  _id: string;
  login: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isLocked: boolean;
  isAdmin: boolean;
}
export interface IResponseApiUser {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
