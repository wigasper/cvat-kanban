import React, { useState } from "react";

import "antd/dist/antd.css";

import { Button, Modal, Form, Input, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';

import { addCard, addCardMultipart } from "../../services/card";
import { addThumbnail } from "../../services/thumbnail";

function AddCardModalComponent({ columnID, onSubmit }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalLoading, setConfirmModalLoading] = useState(false);
  const [modalText, setModalText] = useState("tester");
  const [thumbnailIm, setThumbnailIm] = useState(null);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    let data = new FormData();
    data.append("user", 1);
    data.append("column", columnID);
    data.append("board", 1);
    data.append("thumbnail", thumbnailIm);
    
    data.append("name", values["name"]);

    addCardMultipart(data);
    onSubmit(true);
  };

  const onReset = () => {
    form.resetFields();
  };

  const showModal = () => {
    setModalOpen(true);
  };
  
  const addImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    let data = new FormData();

    data.append("image", file);
    
    try {
      setThumbnailIm(file);
      onSuccess("Ok");
    } catch (err) {
      const error = new Error("Could not upload");
      onError({ err });
    }

  };

  const uploadProps = {
    name: "file",
    customRequest: addImage
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
            <Form.Item label="Upload">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Form>
          <p>{modalText}</p>
        </Modal>
      </div>
    );
  };

  const handleAddCard = () => {
    setModalText("Adding card");
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

  return (
    <div>
      <Button type="dashed" 
        block 
        onClick={showModal} 
        style={{ marginTop: 16 }}
      >
        <b>Add card</b>
      </Button>
      {renderModal()}
    </div>
  );
}

export default AddCardModalComponent;
