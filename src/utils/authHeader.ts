export const authHeader = () => {
  const tokenFromLS = localStorage.getItem('accessToken');
  if (tokenFromLS) {
    const parsedAccessToken = JSON.parse(tokenFromLS);
    return { Authorization: 'Bearer ' + parsedAccessToken };
  } else {
    return {};
  }
};
