import React from "react";

import { Droppable } from "react-beautiful-dnd";

import "antd/dist/antd.css";
import "./kanban-column.css";

import { Card } from "antd";

import KanbanCardComponent from "./kanban-card";

// Kanban column. Args: column is an object with all 
// the data, onCardDelete is a function passed to 
// each card to (hopefully) trigger a parent re-render
// on card deletion
function KanbanColumnComponent({ column, onCardDelete }) {
  const renderColumn = () => {
    return (
      <>
        <Droppable droppableId={column.name} key={column.id}>
          {(provided) => (
            <Card
              className="kanban-column"
              title={column.name}
              style={{ width: 390 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.cards.map((card, index) => (
                <KanbanCardComponent
                  card={card}
                  index={index}
                  onDelete={onCardDelete}
                />
              ))}
              {provided.placeholder}
            </Card>
          )}
        </Droppable>
      </>
    );
  };
  //
  return <div>{renderColumn()}</div>;
}
export default KanbanColumnComponent;
