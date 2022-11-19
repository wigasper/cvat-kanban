import React, { useState, useEffect } from "react";

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
  
  const renderPage = () => {
    return (
      <Row gutter={16}>
        {columns.map((column) => (
          <Col key={column.id} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <KanbanColumnComponent columnID={column.id} /> 
          </Col> 
        ))}
      </Row>
    );
  };

  return (
    <div>
      {renderPage()}
    </div>
  );

}

export default KanbanPageComponent;
