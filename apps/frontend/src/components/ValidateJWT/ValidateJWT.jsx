import { Navigate, Outlet } from "react-router-dom";


// tienes que retornar el sidebar aqui
export function ValidateJWT(){
  let jwtIsValid =false;
  if(!jwtIsValid) return <Navigate to="/login" />
  return <Outlet />
}