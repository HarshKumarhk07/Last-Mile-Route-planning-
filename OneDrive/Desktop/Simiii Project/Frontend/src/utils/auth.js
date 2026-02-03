// src/utils/auth.js

export const getUser = () => {
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage", error);
    return null;
  }
};

export const isAuthenticated = () => {
  return !!getUser();
};

export const logout = () => {
  localStorage.removeItem("user");
};
