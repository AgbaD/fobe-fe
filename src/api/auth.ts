import createRequest from "../utils/api";

function login(payload: { email: string; password: string }) {
  return createRequest("/api/auth/login", "post", payload);
}

function signup(payload: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}) {
  return createRequest("/api/auth/register", "post", payload);
}

export { login, signup };
