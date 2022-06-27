import jwt_decode from 'jwt-decode';

interface IJWT_decode {
  email: string;
  _id: string;
  login: string;
  firstName: string;
  lastName: string;
}

export const getCurrentUserIdJWT = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const decode = jwt_decode<IJWT_decode>(token);
    return decode._id;
  }
  return null;
};

export const getCurrentUserFullNameJWT = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const decode = jwt_decode<IJWT_decode>(token);
    return decode.firstName + ' ' + decode.lastName;
  }
  return;
};
