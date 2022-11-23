
export function getBoard(id) {
	return fetch(`http://localhost:8000/kanban/boards/${id}`).then((res) =>
    res.json()
  );
}

