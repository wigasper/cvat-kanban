import React, { useState, useEffect } from "react";

import { getCard } from "../../services/card";

import { Draggable } from "react-beautiful-dnd";

import "antd/dist/antd.css";
import "./kanban-card.css";

import { Card } from "antd";

function KanbanCardComponent({ card, index }) {
  const renderCard = () => {
    return (
      <Draggable draggableId={card.id + ""} index={card.position}>
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
