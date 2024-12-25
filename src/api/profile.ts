import createRequest from "../utils/api";

function getProfile() {
  return createRequest("/api/profile", "get");
}

export { getProfile }
