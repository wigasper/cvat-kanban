import { config } from "../constants";

const BASE_URL = config.url;

export function getBoard(id) {
  return fetch(`${BASE_URL}/kanban/boards/${id}`).then((res) => res.json());
}
