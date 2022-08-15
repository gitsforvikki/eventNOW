import React, { useState } from 'react';
import { Link , useNavigate  } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as alertActions from '../../redux/alert/alert.action';
import * as userAction from '../../redux/user/user.action';


let Register =()=>{
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [user , setUser] = useState({
        name : '',
        email :'',
        password :''
    });

    let [userError , setUserError] = useState({
        nameError : '',
        emailError :'',
        passwordError :''
    });

    let validateUsername=(event)=>{
        setUser({...user , name : event.target.value});
        let regExp = /^[a-zA-Z0-9]{4,10}$/;
        !regExp.test(event.target.value) ? setUserError({...userError , nameError : 'Enter proper Name.'})  : 
                        setUserError({...userError , nameError : ''});
    };

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

    let submitRegistration=(event)=>{
        event.preventDefault();
       if(user.name !=='' && user.email !=='' && user.password !== ''){
        dispatch(userAction.registerUser(user , navigate));
       }
       else{
           dispatch(alertActions.setAlert('Pleas fillout these fields' , 'danger'));
       }
    }

    return(
        <React.Fragment>
            
            <section className="p-4">
               <div className="container">
                   <div className="row">
                       <div className="col-md-4 m-auto">
                           <div className="card animated zoomIn">
                               <div className="card-header bg-primary text-white">
                                   Register Here
                               </div>
                               <div className="card-body">
                                   <form onSubmit={submitRegistration}>
                                        <div className="form-group">
                                           <input 
                                           value={user.name}
                                           onChange={validateUsername}
                                           type="text" className={`form-control ${userError.nameError.length > 0 ? 'is-invalid'  : ''} `}  placeholder="Name"/>
                                       </div>
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
                                           <input type="submit" className="btn btn-primary btn-sm"  value="Register"/>
                                       </div>
                                   </form>
                               </div>
                               <div className="card-footer">
                                   <small>Have a Account? <Link to='/users/login' className="font-weight-bold">Login</Link></small>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </section>
        </React.Fragment>
    )
}
export default Register;