import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import KanbanColumnComponent from "./kanban-column";

import { patchCard } from "../../services/card";
import { getBoard } from "../../services/board";
import AddCardModalComponent from "./add-card-modal";

import { Col, Row, Spin } from "antd";

import "antd/dist/antd.css";

function KanbanPageComponent() {
  //const [columns, setColumns] = useState([
  //  { name: "initstate", cards: [], id: 0 },
  //]);
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
    //getThisBoard(loading);
    getBoard(1)
      .then((res) => {
        if (loading) {
          setColumns(res.columns);
        }
      })
      .catch((err) => console.log(err));
    return () => setLoading(false);
  }, [columns]);

  const updateBackend = (column) => {
    debugger
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
    //const sourceClone = { ...sourceColumn };

    const destColumn = columns.filter(function (col) {
      return col.name === destination.droppableId;
    })[0];
    const destColumnIndex = columns.indexOf(destColumn);
    //const destClone = { ...destColumn };

    const newColumns = [...columns];

    const thisCard = { ...newColumns[sourceColumnIndex].cards[source.index] };
    debugger
    //const thisCard = { ...sourceClone.cards[source.index] };

    newColumns[sourceColumnIndex].cards.splice(source.index, 1);
    //sourceClone.cards.splice(source.index, 1);
    newColumns[destColumnIndex].cards.splice(destination.index, 0, thisCard);
    //destClone.cards.splice(destination.index, 0, thisCard);
   // debugger

    //newColumns[sourceColumnIndex] = sourceClone;
    //newColumns[destColumnIndex] = destClone;
    /*
    newColumns[sourceColumnIndex].cards.forEach((card, index) => {
      if (card.position !== index) {
        patchCard(card.id, { position: index });
        const newCard = { ...newColumns[sourceColumnIndex].cards[index] };
        newCard.position = index;
        newColumns[sourceColumnIndex].cards[index] = newCard;
      }
    });
    
    if (destColumnIndex !== sourceColumnIndex) {
      newColumns[destColumnIndex].cards.forEach((card, index) => {
        if (card.position !== index || card.column != newColumns[destColumnIndex].id) {
          patchCard(card.id, { position: index, 
            column: newColumns[destColumnIndex].id });
          const newCard = { ...newColumns[destColumnIndex].cards[index] };
          newCard.position = index;
          newColumns[destColumnIndex].cards[index] = newCard;
        }
      });
    }*/

    updateBackend(newColumns[sourceColumnIndex]);

    if (destColumnIndex !== sourceColumnIndex) {
      updateBackend(newColumns[destColumnIndex]);
    }

    setColumns(newColumns);
  };

  const renderPageBAD = () => {
    if (columns[0].name === "initstate") {
      return (
        <div>
          <center>
            <Spin style={{ padding: 40 }} size="large" />
          </center>
        </div>
      );
    } else {
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
                  onSubmit={getThisBoard}
                />
              </Col>
            ))}
          </Row>
        </DragDropContext>
      );
    }
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
                onSubmit={getThisBoard}
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
