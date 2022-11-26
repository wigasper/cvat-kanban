import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import KanbanColumnComponent from "./kanban-column";

import { patchCard } from "../../services/card";
import { getBoard } from "../../services/board";
import AddCardModalComponent from "./add-card-modal";

import { Col, Row, Spin } from "antd";

import "antd/dist/antd.css";

function KanbanPageComponent() {
  const [columns, setColumns] = useState([]);

  const [loading, setLoading] = useState(true);

  // yes this is repetitive but for some reason calling
  // this function inside useEffect causes an annoying
  // delay
  //
  // this is for the AddCardModalComponent, to get a rerender
  // on adding a card. would be nice to just use setLoading but
  // this doesn't work either ?
  const getThisBoard = (loading_) => {
    getBoard(1)
      .then((res) => {
        if (loading_) {
          setColumns(res.columns);
        }
      })
      .catch((err) => console.log(err));
  };

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
      } else if (card.column !== column.id) {
        cardUpdate.column = column.id;
      }

      patchCard(card.id, cardUpdate);
    });
  };

  const onDragEnd = (res) => {
    // some issue here in that the indices are not correct all the time
    // seems to be exacerbated when making a list empty
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
        <Row gutter={1}>
          {columns.map((column) => (
            <Col
              key={column.id}
              xs={{ span: 3, offset: 1 }}
              lg={{ span: 4, offset: 2 }}
            >
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
