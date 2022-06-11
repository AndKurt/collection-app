export interface ISignInForm {
  login: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ISignUpForm extends ISignInForm {
  repeatPassword: string;
}
