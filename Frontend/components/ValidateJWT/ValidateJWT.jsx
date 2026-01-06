import { Navigate, Outlet } from "react-router-dom";

export function ValidateJWT(){
  let jwtIsValid =false;
  if(!jwtIsValid) return <Navigate to="/login" />
  return <Outlet />
}