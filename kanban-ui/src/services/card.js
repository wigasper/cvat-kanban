
export function getCard(id) {
	return fetch(`http://localhost:8000/kanban/cards/${id}`).then((res) =>
    res.json()
  );
}
