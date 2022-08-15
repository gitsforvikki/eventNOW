import Axios from 'axios';

import * as alertActions from '../../redux/alert/alert.action';
import * as userUtil from '../../util/userUtil';
import * as tokenUtil from '../../util/tokenUtil';


export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';


export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const CLICKED_LOGOUT = 'CLICKED_LOGOUT';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';




//register User Action
export const registerUser  =(user , navigate)=>{
    return  async (dispatch)=>{
        try{
            dispatch({type : REGISTER_USER_REQUEST});
            let dataUrl= '/api/users/register';
            let response  =  await Axios.post(dataUrl , user);
            dispatch({type : REGISTER_USER_SUCCESS , payload : response.data});
            dispatch(alertActions.setAlert(response.data.msg , 'success'));
            navigate('/users/login');
        }
        catch(error){
            console.log(error);
            dispatch({type : REGISTER_USER_FAILURE , payload : error.response.data});
            let errorList = error.response.data.errors;
            for(let error of errorList){
                dispatch(alertActions.setAlert(error.msg , 'danger'))
            }
        }
    };
};




//login userAction

export const loginUser = (user , navigate)=>{
    return async (dispatch)=>{
        try{
            dispatch({type : LOGIN_USER_REQUEST});
            let dataUrl= '/api/users/login';
            let response = await Axios.post(dataUrl , user);
            dispatch({type : LOGIN_USER_SUCCESS , payload : response.data});
            dispatch(alertActions.setAlert(response.data.msg , 'success'));   
            navigate('/');
        }
        catch(error){
            console.log(error);
            dispatch({type : LOGIN_USER_FAILURE , payload : error.response.data});
            let errorList = error.response.data.errors;
            for(let error of errorList){
                dispatch(alertActions.setAlert(error.msg , 'danger'))
            }
        }
    };
};

//logout

export const logoutUser= ()=>{
    return (dispatch)=>{
        dispatch({type : CLICKED_LOGOUT});
    }
};

//get  user

export const getUser = ()=>{
    return async (dispatch)=>{
        if(userUtil.getToken()){
            tokenUtil.setAuthToken(userUtil.getToken());
        }
        try{
            dispatch({type : GET_USER_REQUEST});
                let dataUrl = '/api/users';
                let response =  await Axios.get(dataUrl);
                dispatch({type : GET_USER_SUCCESS , payload : response.data});
            
        }
        catch(error){
            dispatch({type : GET_USER_FAILURE , payload : error});
        }
    }
};

