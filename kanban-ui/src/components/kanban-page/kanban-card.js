import React, { useState } from "react";

import { Draggable } from "react-beautiful-dnd";

import "antd/dist/antd.css";
import "./kanban-card.css";

import { Button, Modal, Form, Input } from "antd";

import { patchCard, getCard } from "../../services/card";

// import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Card, Col, Row, Descriptions } from "antd";

function KanbanCardComponent({ card, index }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalLoading, setConfirmModalLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    
  };

  const onReset = () => {
    form.resetFields();
  };

  const getThumbnail = (dim) => {
    if (card.thumbnail !== null) {
      return <img 
          width={dim}
          height={dim}
          alt={card.name}
          src={card.thumbnail}
        />;
    }

    return "";
  }
  
  const getUser = () => {
    if (card.user === null) {
      return "None";
    } else {
      return card.user.username;
    }
    console.log(card);
    /*const thisUser = getCard(card.id).then((res) => {return res.user});
    console.log(thisUser); 
    if (thisUser !== null) {
      return thisUser;
    } else {
      return "None";
    }*/
  }

  const showModal = () => {
    setModalOpen(true);
  };

  const getModal = () => {
    return (
      <Modal
        title={card.name}
        open={modalOpen}
        onOk={handleAddCard}
        confirmLoading={confirmModalLoading}
        onCancel={handleCancel}
      >
      <Row>
        <Col>
          {getThumbnail(128)}
        </Col>
        <Col>
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Number structures">
              {card.num_structures}
            </Descriptions.Item>
            <Descriptions.Item label="Difficulty">
              {getDifficulty()}
            </Descriptions.Item>
            <Descriptions.Item label="User">
              {getUser()}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      </Modal>
    );
  };

  const handleAddCard = () => {
    form.submit();
    setConfirmModalLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmModalLoading(false);
      onReset();
    }, 1000);
  };

  const handleCancel = () => {
    onReset();
    setModalOpen(false);
  };



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



  const renderCard = () => {
    return (
      <Draggable key={card.id} draggableId={card.id + ""} index={index}>
        {(provided) => (
          <Card
            className="kanban-card"
            title={card.name}
            hoverable
            size="small"
            bordered={true}
            onClick={showModal}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Row>
              <Col className="gutter-row">
                {getThumbnail(64)}
              </Col>
              <Col className="gutter-row">
                <Descriptions
                  bordered
                  size="small"
                  layout="vertical"
                >
                  <Descriptions.Item 
                    className="descriptions-item"
                    label="Number structures">
                    {card.num_structures}
                  </Descriptions.Item>
                  <Descriptions.Item className="descriptions-item" label="Difficulty">
                    {getDifficulty()}
                  </Descriptions.Item>


                </Descriptions>
              </Col>
            </Row>
          </Card>
        )}
      </Draggable>
    );
  };

  return <div>{renderCard()}{getModal()}</div>;
}

export default KanbanCardComponent;
