import React, { useState, useEffect } from "react";

import 'antd/dist/antd.css';

import { Row, Button, Modal, Form, Input } from 'antd';

import { addCard } from "../../services/card";

function AddCardModalComponent({ columnID, onSubmit }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalLoading, setConfirmModalLoading] = useState(false);
  const [modalText, setModalText] = useState('tester');
  
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values["user"] = 1;
    values["column"] = columnID;
    values["board"] = 1;

    addCard(values);
    onSubmit(true);
    console.log(values);
  };
  
  const onReset = () => {
    form.resetFields();
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const renderModal = () => {
    return (
      <div>
        <Modal
          title="Title"
          open={modalOpen}
          onOk={handleAddCard}
          confirmLoading={confirmModalLoading}
          onCancel={handleCancel}
        >
          <Form form={form} name="card-data" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Card name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
          <p>{modalText}</p>
        </Modal>
      </div>
    );
  };
  
  const handleAddCard = () => {
    setModalText('Adding card');
    form.submit();
    setConfirmModalLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmModalLoading(false);
    }, 1000);
  };
  
  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
  <div>
    <Button type="primary" onClick={showModal}>
      Add card
    </Button>
    {renderModal()}
  </div>
  );
}

export default AddCardModalComponent;
