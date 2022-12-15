import React from "react";
import { Typography, Row, Col, Button, message } from "antd";
import { logout } from "../services/logout";

const { Title } = Typography;

// Header function, arg.s for parent state
function Header({ loggedInStatus, setLoggedInStatus }) {
  // perform actions on loggedout
	const logoutActions = () => {
    logout();
    localStorage.removeItem("token");
    setLoggedInStatus(false);
    message.success("Logged out");
  };

  // get the necessary authentication button based on
  // logged-in status
  const getAuthNavComponent = (loggedIn) => {
    if (loggedIn) {
      return <Button onClick={logoutActions}>Logout</Button>;
    } else {
      return <Button href="login">Login</Button>;
    }
  };

  return (
    <>
      <Row justify="space-around" align="middle">
        <Col flex={6}>
          <Title level={3}>cvat-kanban</Title>
        </Col>
        <Col flex={1}>{getAuthNavComponent(loggedInStatus)}</Col>
      </Row>
    </>
  );
}

export default Header;
