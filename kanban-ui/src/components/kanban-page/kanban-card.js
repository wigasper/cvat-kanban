import React from "react";

import { Draggable } from "react-beautiful-dnd";

import "antd/dist/antd.css";
import "./kanban-card.css";

import { Card } from "antd";

function KanbanCardComponent({ card, index }) {
  const renderCard = () => {
    return (
      <Draggable key={card.id} draggableId={card.id + ""} index={index}>
        {(provided) => (
          <Card
            className="kanban-card"
            hoverable
            size="small"
            title={card.name}
            bordered={true}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          />
        )}
      </Draggable>
    );
  };

  return <div>{renderCard()}</div>;
}

export default KanbanCardComponent;
