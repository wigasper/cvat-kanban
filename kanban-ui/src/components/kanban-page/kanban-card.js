import React from "react";

import { Draggable } from "react-beautiful-dnd";

import "antd/dist/antd.css";
import "./kanban-card.css";

import { Card, Col, Row } from "antd";

function KanbanCardComponent({ card, index }) {
  const getDifficulty = () => {
    const colorMap = {0: "black",
                      1: "green",
                      2: "green",
                      3: "yellow",
                      4: "orange",
                      5: "red"}

    const bars = Array.from({length: card.difficulty}, () => "▋").join("");

    return <span style={{color: colorMap[card.difficulty]}}>{bars}</span>;
  }

  const getThumbnail = () => {
    if (card.thumbnail !== null) {
      return <img 
          width={64}
          height={64}
          alt={card.name}
          src={card.thumbnail.image}
        />;
    }

    return "";
  }

  const renderCard = () => {
    return (
      <Draggable key={card.id} draggableId={card.id + ""} index={index}>
        {(provided) => (
          <Card
            className="kanban-card"
            hoverable
            size="small"
            title={card.name}
            bordered={true}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Row>
              <Col className="gutter-row">
                {getThumbnail()}
              </Col>
              <Col className="gutter-row">
                <p>Difficulty: {getDifficulty()}</p>
                <p>Number structures: {card.num_structures}</p>
              </Col>
            </Row>
          </Card>
        )}
      </Draggable>
    );
  };

  return <div>{renderCard()}</div>;
}

export default KanbanCardComponent;
