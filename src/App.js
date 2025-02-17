import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from "./Routes/Routing";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    </>
  );
}

export default App;
