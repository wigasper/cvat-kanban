
export function getColumn(id) {
	return fetch(`http://localhost:8000/kanban/columns/${id}`).then((res) =>
    res.json()
  );
}
