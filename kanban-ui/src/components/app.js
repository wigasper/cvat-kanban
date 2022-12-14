import React, { useState } from "react";
import logo from "../logo.svg";
//import 'antd/dist/antd.css';
//import KanbanColumnComponent from "./kanban-page/kanban-column";
import KanbanPageComponent from "./kanban-page/kanban-page.js";

import Header from "./header";


import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn} />}>
          <Route path="/" element={<KanbanPageComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
/*function App() {
  return (
    <div className="App">
      <KanbanPageComponent />
    </div>
  );
}
*/
const Layout = ({ loggedIn }) => {
  return (
    <>
      <div>
        <Header loggedInStatus={loggedIn} />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
