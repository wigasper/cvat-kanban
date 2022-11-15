export function addCard(card) {
	return fetch(`http://localhost:8000/kanban/cards/`, 
		{method: "POST",
			mode: "cors",
      headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify(card)
		})
}

export function getCard(id) {
	return fetch(`http://localhost:8000/kanban/cards/${id}`).then((res) =>
    res.json()
  );
}
