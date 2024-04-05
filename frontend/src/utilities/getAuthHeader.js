const getAuthHeader = (token) => {
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
};

export default getAuthHeader;
