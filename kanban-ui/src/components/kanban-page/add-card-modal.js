import React, { useState } from "react";

import "antd/dist/antd.css";

import { Button, Modal, Form, Input, Upload, Slider } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { addCardMultipart } from "../../services/card";

// Add card modal. columnID for the card POST,
// onSubmit to (hopefully) trigger a parent
// re-render after submitting
function AddCardModalComponent({ columnID, onSubmit }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalLoading, setConfirmModalLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [thumbnailIm, setThumbnailIm] = useState(null);

  const [form] = Form.useForm();

  // Logic for form submission
  const onFinish = (values) => {
    let data = new FormData();
    data.append("user", 1);
    data.append("column", columnID);
    data.append("board", 1);
    data.append("thumbnail", thumbnailIm);

    data.append("name", values["name"]);

    if (values["difficulty"] === undefined) {
      values["difficulty"] = 3;
    }

    data.append("difficulty", values["difficulty"]);
    addCardMultipart(data);
    onSubmit(true);
  };

  // Reset the form
  const onReset = () => {
    setModalText("");
    form.resetFields();
  };

  const showModal = () => {
    setModalOpen(true);
  };

  // Logic for uploading an image
  const addImage = async (options) => {
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

  // Upload component props, used in renderModal()
  const uploadProps = {
    name: "file",
    customRequest: addImage,
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
            <Form.Item name="difficulty" label="Difficulty">
              <Slider defaultValue={3} min={1} max={5} />
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

  // Logic when finalizing the modal
  const handleAddCard = () => {
    setModalText("Adding card");
    form.submit();
    setConfirmModalLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmModalLoading(false);
      onReset();
    }, 600);
  };

  // Reset everything
  const handleCancel = () => {
    onReset();
    setModalOpen(false);
  };

  return (
    <div>
      <Button type="dashed" block onClick={showModal} style={{ marginTop: 16 }}>
        <b>Add card</b>
      </Button>
      {renderModal()}
    </div>
  );
}

export default AddCardModalComponent;
