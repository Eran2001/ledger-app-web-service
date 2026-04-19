import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import token from "./utilities";

const defaultHeaders = (contentType = "application/json") => {
  return {
    "X-Request-Id": uuidv4(),
    "Content-Type": contentType,
    "Accept-Language": "es-US",
    Accept: "application/json",
    Authorization: "Bearer " + token.getAuthToken(),
  };
};

const publicHeaders = () => {
  return {
    "X-Request-Id": uuidv4(),
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer I will add token",
  };
};

const clientOnboarding = axios.create({
  baseURL: import.meta.env.VITE_LEDGER_APP_ONBOARDING_API,
  timeout: 30000,
});

const instance = {
  clientOnboarding,

  defaultHeaders,
  publicHeaders,
};

export default instance;
