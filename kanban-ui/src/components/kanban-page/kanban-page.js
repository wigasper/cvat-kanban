import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import KanbanColumnComponent from "./kanban-column";

import { getColumns } from "../../services/column";
import { patchCard } from "../../services/card";
import { getBoard } from "../../services/board";
import AddCardModalComponent from "./add-card-modal";

import { Col, Row, Spin } from "antd";

import "antd/dist/antd.css";

function KanbanPageComponent() {
  const [columns, setColumns] = useState([{ name: "initstate", cards: [], id: 0 }]);
  const [loading, setLoading] = useState(true);
  
  const getThisBoard = loading => {
    getBoard(1)
      .then((res) => {
        if (loading) {
          console.log("loading");
          setColumns(res.columns);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getThisBoard(loading);
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
    if (columns[0].name === "initstate") {
      return (
        <div>
          <center>
            <Spin style={{ padding: 40}} size="large" />
          </center>
        </div>
      );
    } else {
      return(
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
                  onSubmit={getThisBoard} 
                />
              </Col>
            ))}
          </Row>
        </DragDropContext>
      );
    }
  };

  return <div>{renderPage()}</div>;
}

export default KanbanPageComponent;
