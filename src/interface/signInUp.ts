export interface ILogin {
  login: string;
  password: string;
}

export interface IRegister extends ILogin {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ISignUpForm extends IRegister {
  repeatPassword: string;
}
