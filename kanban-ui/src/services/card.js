export function addCard(card) {
  return fetch(`http://localhost:8000/kanban/cards/`, {
    method: "POST",
    mode: "cors",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });
}

export function addCardMultipart(cardFormData) {
   return fetch(`http://localhost:8000/kanban/cards/`, {
    method: "POST",
    mode: "cors",
    body: cardFormData,
  })
};

export function getCard(id) {
  return fetch(`http://localhost:8000/kanban/cards/${id}`).then((res) =>
    res.json()
  );
}

export function patchCard(id, changes) {
  return fetch(`http://localhost:8000/kanban/cards/${id}/`, {
    method: "PATCH",
    mode: "cors",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
}
