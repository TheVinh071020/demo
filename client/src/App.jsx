import { useState } from "react";
import "./App.css";
import Index from "./component/index";
import Detail from "./component/questions/Detail";
import Ask from "./component/ask/Ask";
import Navbar from "./component/Navbar/Navbar";
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
