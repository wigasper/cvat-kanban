import React from "react";

import { Droppable } from "react-beautiful-dnd";

import "antd/dist/antd.css";
import "./kanban-column.css";

import { Card } from "antd";

import KanbanCardComponent from "./kanban-card";

function KanbanColumnComponent({ column }) {
  const renderColumn = () => {
    return (
      <>
        <Droppable droppableId={column.name} key={column.id}>
          {(provided) => (
            <Card
              className="kanban-column"
              title={column.name}
              style={{ width: 370 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {column.cards.map((card, index) => (
                <KanbanCardComponent card={card} index={index} />
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
