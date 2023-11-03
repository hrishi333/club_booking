import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import AdminTableOfClub from "./components/AdminTableOfClub";
import Home from "./views/Home";
import AdminView from "./views/AdminView";
import CustomerView from "./views/CustomerView";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/customer" element={<CustomerView />} />
        </Routes>
      </Router>
        <ToastContainer/>
    </div>
  );
}

export default App;
