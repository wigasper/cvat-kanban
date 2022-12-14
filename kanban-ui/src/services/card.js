import { config } from "../constants";

const BASE_URL = config.url;

export function addCard(card) {
  return fetch(`${BASE_URL}/kanban/cards/`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(card),
  });
}

export function addCardMultipart(cardFormData) {
  return fetch(`${BASE_URL}/kanban/cards/`, {
    method: "POST",
    mode: "cors",
    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    body: cardFormData,
  });
}

export function deleteCard(id) {
  return fetch(`${BASE_URL}/kanban/cards/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
  });
}

export function getCard(id) {
  return fetch(`${BASE_URL}/kanban/cards/${id}`).then((res) => res.json());
}

export function patchCard(id, changes) {
  return fetch(`${BASE_URL}/kanban/cards/${id}/`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(changes),
  });
}
