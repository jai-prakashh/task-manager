import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import TaskList from "./components/taskList";
import Login from "./components/login";
import Header from "./components/header";
import ProtectedRoute from "./components/protectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer position="top-right" autoClose={2000} />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
