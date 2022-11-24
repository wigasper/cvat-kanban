export function getColumn(id) {
  return fetch(`http://localhost:8000/kanban/columns/${id}`).then((res) =>
    res.json()
  );
}

export function getColumns() {
  return fetch(`http://localhost:8000/kanban/columns/`).then((res) =>
    res.json()
  );
}

export function patchColumn(column, id) {
  return fetch(`http://localhost:8000/kanban/columns/${id}/`, {
    method: "PATCH",
    mode: "cors",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(column),
  });
}
