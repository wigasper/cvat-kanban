import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import KanbanColumnComponent from "./kanban-column";

import { patchCard } from "../../services/card";
import { getBoard } from "../../services/board";
import AddCardModalComponent from "./add-card-modal";

import { Col, Row } from "antd";

import "antd/dist/antd.css";

function KanbanPageComponent() {
  const [columns, setColumns] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBoard(1)
      .then((res) => {
        if (loading) {
          setColumns(res.columns);
        }
      })
      .catch((err) => console.log(err));
    return () => setLoading(false);
  }, [columns, loading]);

  const updateBackend = (column) => {
    column.cards.forEach((card, index) => {
      const cardUpdate = {};
      
      if (card.position !== index) {
        cardUpdate.position = index;
      }

      if (card.column !== column.id) {
        cardUpdate.column = column.id;
      }
      
      if (JSON.stringify(cardUpdate) !== '{}') {
        patchCard(card.id, cardUpdate);
      }

    });
  };

  const onDragEnd = (res) => {
    const { destination, source } = res;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.filter(function (col) {
      return col.name === source.droppableId;
    })[0];
    const sourceColumnIndex = columns.indexOf(sourceColumn);

    const destColumn = columns.filter(function (col) {
      return col.name === destination.droppableId;
    })[0];
    const destColumnIndex = columns.indexOf(destColumn);

    const newColumns = [...columns];

    const thisCard = newColumns[sourceColumnIndex].cards.splice(
      source.index,
      1
    )[0];

    newColumns[destColumnIndex].cards.splice(destination.index, 0, thisCard);

    updateBackend(newColumns[sourceColumnIndex]);

    if (destColumnIndex !== sourceColumnIndex) {
      updateBackend(newColumns[destColumnIndex]);
    }
    
    setColumns(newColumns);
  };

  const renderPage = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={[8, 8]} style={{ margin: 8 }}>
          {columns.map((column) => (
            <Col key={column.id}>
              <KanbanColumnComponent column={column} />
              <AddCardModalComponent
                columnID={column.id}
                onSubmit={setLoading}
              />
            </Col>
          ))}
        </Row>
      </DragDropContext>
    );
  };

  return <div>{renderPage()}</div>;
}

export default KanbanPageComponent;
