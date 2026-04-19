import { useAuthStore } from "@/store/auth.store";

const getAuthToken = (): string | null => {
  return localStorage.getItem("session.token");
};

const setAuthToken = (authToken: string) => {
  localStorage.setItem("session.token", authToken);
};

const getSubscription = () => {
  const subscription = localStorage.getItem("session.subscription");
  if (subscription != null) {
    return JSON.parse(subscription);
  }
  return null;
};

const setSubscription = (subscription: object | null) => {
  if (subscription) {
    localStorage.setItem("session.subscription", JSON.stringify(subscription));
  } else {
    localStorage.removeItem("session.subscription");
  }
};

const getUserData = () => {
  const userData = localStorage.getItem("session.user");
  if (userData != null) {
    return JSON.parse(userData);
  }
  return null;
};

const setUserData = (userData: object) => {
  localStorage.setItem("session.user", JSON.stringify(userData));
};

const token = {
  getAuthToken,
  setAuthToken,
  getSubscription,
  setSubscription,
  getUserData,
  setUserData,
};

export default token;
