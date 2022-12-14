import { config } from "../constants";

const BASE_URL = config.url;

export function getColumn(id) {
  return fetch(`${BASE_URL}/kanban/columns/${id}`).then((res) => res.json());
}

export function getColumns() {
  return fetch(`${BASE_URL}/kanban/columns/`).then((res) => res.json());
}

export function patchColumn(column, id) {
  return fetch(`${BASE_URL}/kanban/columns/${id}/`, {
    method: "PATCH",
    mode: "cors",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(column),
  });
}
