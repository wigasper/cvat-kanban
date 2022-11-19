import React, { useState, useEffect } from "react";

import { getCard } from "../../services/card";

import { Draggable } from "react-beautiful-dnd";

import 'antd/dist/antd.css';

import { Card } from "antd";

function KanbanCardComponent({ card, index }) {

  const renderCard = () => {
    return (
      <Draggable draggableId={card.id + ''} index={index}>
        {(provided) => (
          <Card 
            size="small" 
            title={card.name} 
            bordered={false} 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          />
        )}
      </Draggable>
    );
  };
  
  return (
  <div>
    {renderCard()}
  </div>
  );
}

export default KanbanCardComponent;
