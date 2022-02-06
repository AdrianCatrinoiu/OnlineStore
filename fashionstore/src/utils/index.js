export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || currentUser.role === "user") return false;

  return true;
};
