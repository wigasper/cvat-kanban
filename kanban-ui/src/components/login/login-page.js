import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/login";

import { Card, Form, Input, Button } from "antd";

function LoginPage({ setLoggedIn }) {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
    login(values).then((token) =>
      localStorage.setItem("token", token.auth_token)
    );
    console.log(localStorage.getItem("token"));
    setLoggedIn(true);
    navigate("/");
  };

  return (
    <>
      <center>
        <Card title="Login" style={{ width: 400, marginTop: 60 }}>
          <Form form={form} name="login-data" onFinish={onFinish}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Input password" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </center>
    </>
  );
}

export default LoginPage;
