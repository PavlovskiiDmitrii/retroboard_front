export const checkAuthorization = (): boolean => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
};
