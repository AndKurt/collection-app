import jwt_decode from 'jwt-decode';

interface IJWT_decode {
  email: string;
  _id: string;
  login: string;
}

export const getCurrentUserIdJWT = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const decode = jwt_decode<IJWT_decode>(token);
    return decode._id;
  }
  return null;
};
