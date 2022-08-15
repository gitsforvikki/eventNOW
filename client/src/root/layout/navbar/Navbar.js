import React from 'react';
import  {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import brandLogo  from '../../../assets/img/brand-logo.png';
import * as userAction from '../../../redux/user/user.action';
import * as userReducer from '../../../redux/user/user.reducer';

import * as userUtils from '../../../util/userUtil';

let Navbar =()=>{

    let dispatch = useDispatch();

    let clickLogOut=()=>{
        dispatch(userAction.logoutUser());
    };

    let userInfo = useSelector((state)=>{
        return state[userReducer.userFeaturesKey]
    });

    let  { user} = userInfo;

    let beforeLogin =(
        <React.Fragment>
            <li className="nav-item">
                    <Link to='/users/login' className="nav-link ">
                    <i className="fa fa-sign-in-alt"/>Login
                    </Link>
            </li>
            <li className="navbar-item">
                    <Link to='/users/register' className="nav-link">
                        <i className="fa fa-user-cog" />Register
                    </Link>
            </li>
        </React.Fragment>
    );
        

     let afterLoginLinks = (
        <React.Fragment>
            <li className="navbar-item">
                <Link to="/" className="nav-link" onClick={clickLogOut}>
                    <img src={user.avatar} width="25" height="25" className="rounded-circle" alt=""/> {user.name}</Link>
            </li>
            <li className="navbar-item">
                <Link to="/" className="nav-link" onClick={clickLogOut}>
                    <i className="fa fa-sign-out-alt text-muted"/> LogOut</Link>
            </li>
        </React.Fragment>
    );

    
       

    


    return(
        <React.Fragment>
            <nav className="navbar navbar-light  bg-light navbar-expand-sm">
                <div className="container">
                    <Link to='/' className="navbar-brand">
                        <img src={brandLogo} alt="" />
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item ">
                                <Link to='/events/free' className="nav-link ">Free Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/events/pro' className="nav-link ">Pro Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/events/upload' className="nav-link ">Upload Events</Link>
                            </li>
                            
                        </ul>

                        <ul className="navbar-nav ml-auto">
                        {
                            userUtils.isLogedIn() ? afterLoginLinks : beforeLogin
                        }
        
                         </ul>
                        
                        
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
};
export default Navbar;