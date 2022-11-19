import React, { useState, useEffect } from "react";

import { getColumn } from "../../services/column";

import { Droppable } from "react-beautiful-dnd";

import 'antd/dist/antd.css';

import { Card } from "antd";

import KanbanCardComponent from "./kanban-card";

import AddCardModalComponent from "./add-card-modal";

import { Row, Button, Modal, Form, Input } from 'antd';

function KanbanColumnComponent({ columnID }) {
	const [column, setColumn] = useState({ name: "a" , cards: []});
  const [refreshCount, setRefreshCount] = useState(0);
  
  const getCol = mounted => {
     getColumn(columnID)
      .then((res) => {
        if (mounted) {
          setColumn(res)
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let mounted = true;
    
    getCol(mounted);
    
    return () => (mounted = false);
  }, [columnID]);
 
  const renderColumn = () => {
    return (
      <>
        <Droppable droppableId={column.name}>
          {provided => (
            <Card 
              title={column.name} 
              style={{ width: 300 }} 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.cards.map((card, index) => (
                <Row key={card.id}>
                  <KanbanCardComponent card={card} index={index}/>
                </Row>
              ))}
              {provided.placeholder}
            </Card>
          )}
        </Droppable>
        <AddCardModalComponent columnID={columnID} onSubmit={getCol} />
      </>
    );
  };
  
  return (
  <div>
    {renderColumn()}
  </div>
  );
}

export default KanbanColumnComponent;
