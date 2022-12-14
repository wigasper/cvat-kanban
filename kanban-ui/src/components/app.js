import React, { useState, useEffect } from "react";
import KanbanPageComponent from "./kanban-page/kanban-page.js";

import Header from "./header";
import LoginPage from "./login/login-page";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");

      if (token !== null) {
        setLoggedIn(true);
      }
    }
    setLoading(false);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        >
          <Route path="/" element={<KanbanPageComponent />} />
          <Route
            path="/login"
            element={<LoginPage setLoggedIn={setLoggedIn} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = ({ loggedIn, setLoggedIn }) => {
  return (
    <>
      <div>
        <Header loggedInStatus={loggedIn} setLoggedInStatus={setLoggedIn} />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
