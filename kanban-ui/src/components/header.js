import React, { useState } from "react";
import { Typography, Row, Col, Button } from "antd";
import { logout } from "../services/logout";

const { Title } = Typography;

function Header({ loggedInStatus, setLoggedInStatus }){

  const logoutActions = () => {
    logout();
    localStorage.setItem("token", {});
    setLoggedInStatus(false);
    console.log(localStorage.getItem("token"));
  }

  const getAuthNavComponent = (loggedIn) => {
    const tok = localStorage.getItem("token");

    if (loggedIn) {
      return(<Button onClick={logoutActions}>Logout</Button>);
    } else {
      return(<Button href="login">Login</Button>);
    }
  };

  return (
    <>
      <Row justify="space-around" align="middle">
        <Col flex={6}>
          <Title level={3}>cvat-kanban</Title>
        </Col>
        <Col flex={1}>
          {getAuthNavComponent(loggedInStatus)}
        </Col>
      </Row>
    </>
  );
};

export default Header;
