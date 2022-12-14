import React, { useState } from "react";
import { Typography, Row, Col, Button } from "antd";

const { Title } = Typography;

function Header({ loggedInStatus }){

  const getAuthNavComponent = (loggedIn) => {
    if (loggedIn) {
      return(<Button>Logout</Button>);
    } else {
      return(<Button>Login</Button>);
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
