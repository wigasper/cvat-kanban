import React, { useState, useEffect } from "react";

import { getCard } from "../../services/card";

import 'antd/dist/antd.css';

import { Card } from "antd";

function KanbanCardComponent({ card }) {

  const renderCard = () => {
    return (
      <Card size="small" title={card.name} bordered={false} />
    );
  };
  
  return (
  <div>
    {renderCard()}
  </div>
  );
}

export default KanbanCardComponent;
