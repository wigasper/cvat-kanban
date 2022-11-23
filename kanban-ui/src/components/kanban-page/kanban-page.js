import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import KanbanColumnComponent from "./kanban-column";

import { getColumns } from "../../services/column";
import { patchCard } from "../../services/card";
import { getBoard } from "../../services/board";

import { Col, Row } from 'antd';

import 'antd/dist/antd.css';

function KanbanPageComponent() {
  const [columns, setColumns] = useState([ ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //setTimeout(() => {
    //  setLoading(true);
    //}, 3000);
    //setLoading(true);
    // let loading = true;
    getBoard(1)
      .then((res) => {
        if (loading) {
          console.log(res.columns);
          setColumns(res.columns);
          console.log(columns);
        }
      })
      .catch((err) => console.log(err));

    return () => (setLoading(false));
  }, [columns]);
  
 /* const renderColumns = () => {
    return columns.map((column) => (
      <Col key={column.id} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <KanbanColumnComponent columnID={column.id} /> 
      </Col>
    ));
  };*/
  
  const onDragEnd = res => {
    console.log(res);
    const { destination, source, draggableId } = res;

    if (!destination) {
      console.log("hit no dest arm");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log(destination.index);
      console.log(source.index);
      console.log("hit same spot arm");
      return;
    }
    
    const thisColumn = columns.filter(function(col) {
      return col.name === source.droppableId
    })[0];
    console.log(thisColumn);
    const thisColumnIndex = columns.indexOf(thisColumn);
    
    const thisCard = thisColumn.cards[source.index];

    const newCards = Array.from(thisColumn.cards);
    newCards.splice(source.index, 1);
    newCards.splice(destination.index, 0, thisCard);
    
    thisColumn.cards = newCards;
    
    thisColumn.cards.forEach((card, index) => {
      if (card.position !== index) {
        //card.position = index;
        patchCard(card.id, {"position": index});
      }
    }
    );

    const columnsCopy = Array.from(columns);
    columnsCopy[thisColumnIndex] = thisColumn;
    console.log("THIS COLUMN");
    console.log(thisColumn);
    //console.log(columnsCopy);
    //setLoading(true);
    setColumns(columnsCopy);
    setLoading(true);
    console.log("ALL COLUMNS");
    console.log(columns);
    
    // maybe instead issue a patch here and then refresh
    //patchColumn(thisColumn, thisColumn.id);
  }

  const renderPage = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={16}>
          {columns.map((column) => (
            <Col key={column.id} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
              <KanbanColumnComponent columnID={column.id} /> 
            </Col> 
          ))}
        </Row>
      </DragDropContext>
    );
  };

  return (
    <div>
      {renderPage()}
    </div>
  );

}

export default KanbanPageComponent;
