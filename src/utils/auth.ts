export const checkAuthorization = (): boolean => {
  if (localStorage.getItem("Token")) {
    return true;
  }
  return false;
};
