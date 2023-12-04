import React, { useEffect, useState } from "react";
import ListDetail from "./pages/listDetail";
import ListOfLists from "./pages/ListOfLists";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

import { useAtom } from 'jotai'
import { isDarkAtom }  from '../state-managment';

function App() {
  const user = {
    name: "Junior Garcia",
    avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
    username: "jrgarciadev",
    url: "https://twitter.com/jrgarciadev",
    role: "Software Developer",
    status: "Active",
  };

  const [isDark, setIsDark] = useAtom(isDarkAtom)

  return (
    <>
    <main className={`${isDark ? 'dark' : ''} text-foreground bg-background`}>
    <Router>
        <NavigationBar/>
        <div>
        <Routes>
          <Route exact path="/list/:id" element={<ListDetail />} />
          <Route exact path="/" element={<ListOfLists />} />
        </Routes>
      </div>
    </Router>
    </main>
    </>
  );
}

export default App;
