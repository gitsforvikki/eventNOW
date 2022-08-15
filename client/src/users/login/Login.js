import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import * as alertActions from '../../redux/alert/alert.action';
import * as userAction from '../../redux/user/user.action';

let Login =()=>{
    let dispatch = useDispatch();
    let navigate =useNavigate();

    let [user , setUser] = useState({
        email :'',
        password :''
    });

    let [userError , setUserError] = useState({
        emailError :'',
        passwordError :''
    });

    let validateUserEmail=(event)=>{
        setUser({...user , email : event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ? setUserError({...userError , emailError : 'Enter proper Email.'}) : 
                        setUserError({...userError , emailError : ''});
    };

    let validatePassword=(event)=>{
        setUser({...user , password : event.target.value});
        let regExp = /^[A-Za-z]\w{7,14}$/;
        !regExp.test(event.target.value) ? setUserError({...userError , passwordError : 'Enter Proper Password'}) : 
                                            setUserError({...userError , passwordError : ''});
    };

    let submitLogin=(event)=>{
        event.preventDefault();
        if(user.email !== '' && user.password !== ''){
            dispatch(userAction.loginUser(user ,navigate));
        }
        else{
            dispatch(alertActions.setAlert('Please fillout these fields' , 'danger'));
        }
    }
    return(
        <React.Fragment>
           <section className="p-4">
               <div className="container">
                   <div className="row">
                       <div className="col-md-4 m-auto ">
                            <div className="card animated zoomIn">
                                <div className="card-header bg-secondary text-white">
                                    Login Here
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submitLogin}>
                                        <div className="form-group">
                                            <input 
                                            value={user.email}
                                            onChange={validateUserEmail}
                                            type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`}  placeholder="Email or userId"/>
                                        </div>
                                        <div className="form-group">
                                            <input 
                                            value={user.password}
                                            onChange={validatePassword}
                                            type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`}  placeholder="Password"/>
                                        </div>
                                        <div>
                                            <input type="submit" className="btn btn-secondary btn-sm"  value="Login"/>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <small>Don't have Account? <Link to='/users/register' className="font-weight-bold">Register</Link></small>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
           </section>
        </React.Fragment>
    )
}
export default Login;

