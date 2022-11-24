import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import KanbanColumnComponent from "./kanban-column";

import { getColumns } from "../../services/column";
import { patchCard } from "../../services/card";
import { getBoard } from "../../services/board";

import { Col, Row } from "antd";

import "antd/dist/antd.css";

function KanbanPageComponent() {
  const [columns, setColumns] = useState([{ name: "a", cards: [], id: 0 }]);
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
  }, [columns]);

  const onDragEnd = (res) => {
    const { destination, source, draggableId } = res;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const thisColumn = columns.filter(function (col) {
      return col.name === source.droppableId;
    })[0];

    const thisColumnIndex = columns.indexOf(thisColumn);

    /// revised
    const newColumns = [...columns];

    const thisCard = { ...newColumns[thisColumnIndex].cards[source.index] };
    newColumns[thisColumnIndex].cards.splice(source.index, 1);
    newColumns[thisColumnIndex].cards.splice(destination.index, 0, thisCard);

    newColumns[thisColumnIndex].cards.forEach((card, index) => {
      if (card.position !== index) {
        patchCard(card.id, { position: index });
        const newCard = { ...newColumns[thisColumnIndex].cards[index] };
        newCard.position = index;
        newColumns[thisColumnIndex].cards[index] = newCard;
      }
    });

    setColumns(newColumns);
  };

  const renderPage = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={16}>
          {columns.map((column) => (
            <Col
              key={column.id}
              xs={{ span: 5, offset: 1 }}
              lg={{ span: 6, offset: 2 }}
            >
              <KanbanColumnComponent column={column} />
            </Col>
          ))}
        </Row>
      </DragDropContext>
    );
  };

  return <div>{renderPage()}</div>;
}

export default KanbanPageComponent;
