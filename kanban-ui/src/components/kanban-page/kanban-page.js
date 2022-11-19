import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import KanbanColumnComponent from "./kanban-column";

import { getColumns } from "../../services/column";
import { getBoard } from "../../services/board";

import { Col, Row } from 'antd';

import 'antd/dist/antd.css';

function KanbanPageComponent() {
  const [columns, setColumns] = useState([ ]);
  
  useEffect(() => {
    let mounted = true;
    getBoard(1)
      .then((res) => {
        if (mounted) {
          console.log(res.columns);
          setColumns(res.columns);
          console.log(columns);
        }
      })
      .catch((err) => console.log(err));

    return () => (mounted = false);
  }, []);
  
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

    const columnsCopy = Array.from(columns);
    columnsCopy[thisColumnIndex] = thisColumn;
    
    console.log(columnsCopy);

    setColumns(columnsCopy);
    // maybe instead issue a patch here and then refresh
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
