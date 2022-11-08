import React, { useState, useEffect } from "react";

import { getCard } from "../../services/card";

//import 'antd/dist/antd.css';

import { Card } from "antd";

function KanbanCardComponent({ cardID }) {
	const [card, setCard] = useState({ name: "" });
  
  useEffect(() => {
    let mounted = true;
    getCard(cardID)
      .then((res) => {
        if (mounted) {
          setCard(res)
        }
      })
      .catch((err) => console.log(err));

    return () => (mounted = false);
  }, [cardID]);

  const renderCard = () => {
    return (
      <Card title={card.name} style={{ width: 300 }} />
    );
  };
  
  return (
  <div>
    {renderCard()}
  </div>
  );
}

export default KanbanCardComponent;
