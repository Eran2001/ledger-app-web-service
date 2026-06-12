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
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODUwMTAxMTcsInJlc291cmNlSWQiOiI2ODU0YmUzZS1mODc1LTRkMzYtOGZlNy0zYTM2YmIxYTA5NjYiLCJ0ZWFtIjoiZ2VzdCJ9.Io1YIe17PGomsFvnR9YstVrK1THCz22oMvMttDi6fHE",
  };
};

const clientOnboarding = axios.create({
  baseURL: import.meta.env.VITE_DUNNER_ONBOARDING_API,
  timeout: 30000,
});

const instance = {
  clientOnboarding,

  defaultHeaders,
  publicHeaders,
};

export default instance;
