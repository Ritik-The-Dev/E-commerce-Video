import { FC } from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
  return <Outlet />;
};

export default ProtectedRoute;