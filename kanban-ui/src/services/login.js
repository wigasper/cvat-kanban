import { config } from "../constants";

const BASE_URL = config.url;

export function login(userData) {
  const result = fetch(`${BASE_URL}/accounts/auth/token/login`, {
    method: "POST",
    mode: "cors",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => res.json());

  return result;
}
