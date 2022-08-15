import React from "react";
import * as userUtil from '../util/userUtil';
import { Navigate } from "react-router-dom"; 
 

const PrivateRoute= ({ children }) => {
 const auth =userUtil.isLogedIn();

  return auth  ? children : <Navigate to={"/users/login" } />
}

export default PrivateRoute;