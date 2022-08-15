import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router , Routes ,Route }  from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from './root/layout/navbar/Navbar';
import Home  from './root/layout/home/Home';
import FreeEvents from './events/free/FreeEvents';
import ProEvents from './events/pro/ProEvents';
import UploadEvents from './events/upload/UploadEvents';
import Login from './users/login/Login';
import Register from './users/register/Register';
import Alert from './root/util/alert/Alert';

import * as userAction from './redux/user/user.action';
import * as userUtil from './util/userUtil';
import PrivateRoute from './util/PrivateRoute';


let App =()=>{
  
  let dispatch = useDispatch();
  useEffect(()=>{
    if(userUtil.getToken()){
      dispatch(userAction.getUser());
    }
  },[]);

 
 

  return (
    <React.Fragment>
       <Router>
          <Navbar/>
          <Alert/>
          <Routes>
            <Route path = '/' element = {<Home/>} />
            <Route path = '/events/free' element = {<FreeEvents/>} />
            <Route path="/events/pro" element={ <PrivateRoute ><ProEvents/></PrivateRoute>}/>
            <Route path = '/events/upload' element = { <PrivateRoute ><UploadEvents/></PrivateRoute>} />
            <Route path = '/users/login' element = {< Login/>} />
            <Route path = '/users/register' element = {<Register/>} />
\          </Routes>
       </Router>

      
    </React.Fragment>
  );
}
   
export default App;
