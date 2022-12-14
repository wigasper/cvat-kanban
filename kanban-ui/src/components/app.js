import React, { useState } from "react";
import logo from "../logo.svg";
//import 'antd/dist/antd.css';
//import KanbanColumnComponent from "./kanban-page/kanban-column";
import KanbanPageComponent from "./kanban-page/kanban-page.js";

import Header from "./header";
import LoginPage from "./login/login-page";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  /*
	return (
    <Root>
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn} />}>
          <Route path="/" element={<KanbanPageComponent />} />
	        <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Root>
  );*/

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
          <Route path="/" element={<KanbanPageComponent />} />
	        <Route path="/login" element={<LoginPage 
            setLoggedIn={setLoggedIn} />} />
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
