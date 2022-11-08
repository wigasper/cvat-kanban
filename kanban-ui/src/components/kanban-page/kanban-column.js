import React, { useState, useEffect } from "react";

import { getColumn } from "../../services/column";

import 'antd/dist/antd.css';

import { Card } from "antd";

import KanbanCardComponent from "./kanban-card";

import { Row } from 'antd';

function KanbanColumnComponent({ columnID }) {
	const [column, setColumn] = useState({ name: "" , cards: []});
  
  useEffect(() => {
    let mounted = true;
    getColumn(columnID)
      .then((res) => {
        if (mounted) {
          setColumn(res)
        }
      })
      .catch((err) => console.log(err));

    return () => (mounted = false);
  }, [columnID]);

  const renderColumn = () => {
    console.log(column)
    return (
      <Card title={column.name} style={{ width: 600 }}>
        {column.cards.map(card => (
          <Row key={card}>
            <KanbanCardComponent cardID={card} />
          </Row>
        ))}
      </Card>
    );
  };
  
  return (
  <div>
    {renderColumn()}
  </div>
  );
}

export default KanbanColumnComponent;
