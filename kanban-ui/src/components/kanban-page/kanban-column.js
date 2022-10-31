import React, { useState, useEffect } from "react";

import { getColumn } from "../../services/column";

import 'antd/dist/antd.css';

import { Card } from "antd";

function KanbanColumnComponent(columnID) {
	const [column, setColumn] = useState({ name: "" });
  
  useEffect(() => {
    let mounted = true;
    getColumn(columnID)
      .then((res) => {
        if (mounted) {
          setColumn(res)
        }
      })
      .catch((err) => console.log(err));

    return () => (mounted = false);
  }, []);

  const renderColumn = () => {
    return (
      <Card title=column.name style={{ width: 300 }}>
        <p>tester</p>
      </Card>
    );
  };
  
  return (
    {renderColumn()}
  );
}

export default KanbanColumnComponent;
