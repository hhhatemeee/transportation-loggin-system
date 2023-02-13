import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuth } from "../../hooks/auth";
import { AppLayout } from "../AppLayout";

export const PrivateRoute = () => {
  const { isAuth } = useAuth()

  return isAuth ? <AppLayout><Outlet /></AppLayout> : <Navigate to={ROUTES.LOGIN} />
};

