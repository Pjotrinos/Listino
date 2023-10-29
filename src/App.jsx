import React from "react";
import ListDetail from "./pages/listDetail";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

function App() {
  const user = {
    name: "Junior Garcia",
    avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
    username: "jrgarciadev",
    url: "https://twitter.com/jrgarciadev",
    role: "Software Developer",
    status: "Active",
  };

  return (
    <Router>
        <NavigationBar/>
        <div>
        <Routes>
          <Route exact path="/" element={<ListDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
