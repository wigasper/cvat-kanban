import { config } from "../constants";

const BASE_URL = config.url;

export function logout() {
  return fetch(`${BASE_URL}/accounts/auth/token/logout`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: localStorage.getItem("token"),
  });
}
