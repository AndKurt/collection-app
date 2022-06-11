const REQUIRED = 'Required to fill';

export const loginValidation = {
  required: REQUIRED,
  validate: (value: string) => {
    if (!value.match(/^[a-zA-Z0-9]{4,8}$/)) {
      return 'Minimum 4 maximum 8 characters. Only letters and numbers';
    }
    return true;
  },
};

export const emailValidation = {
  required: REQUIRED,
  validate: (value: string) => {
    if (
      !value.match(
        /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return 'The email address is not valid. Examples: test@google.com, test@mail.ru and etc.';
    }
    return true;
  },
};

export const firstNameValidation = {
  required: REQUIRED,
  validate: (value: string) => {
    if (!value.match(/^[a-zA-Z]{2,}$/)) {
      return 'Minimum 1character. Only letters';
    }
    return true;
  },
};
export const lastNameValidation = {
  required: REQUIRED,
  validate: (value: string) => {
    if (!value.match(/^[a-zA-Z]{2,}$/)) {
      return 'Minimum 1character. Only letters';
    }
    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED,
};
