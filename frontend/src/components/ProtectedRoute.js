import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ children, ...props }) => {
  return (
    <Routes>
    <Route path={props.path} element={props.loggedIn ? children : <Navigate to="/sign-in" />}>
    </Route>
    </Routes>
  );
};

export default ProtectedRoute;