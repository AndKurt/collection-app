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
