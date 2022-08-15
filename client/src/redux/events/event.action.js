import Axios from 'axios';
import * as alertAction from '../../redux/alert/alert.action';
import * as userUtil from '../../util/userUtil';
import * as tokenUtil from '../../util/tokenUtil';


export const UPLOAD_EVENT_REQUEST ='UPLOAD_EVENT_REQUEST';
export const UPLOAD_EVENT_SUCCESS ='UPLOAD_EVENT_SUCCESS';
export const UPLOAD_EVENT_FAILURE ='UPLOAD_EVENT_FAILURE';

export const GET_FREE_EVENTS_REQUEST = 'GET_FREE_EVENTS_REQUEST';
export const GET_FREE_EVENTS_SUCCESS = 'GET_FREE_EVENTS_SUCCESS';
export const GET_FREE_EVENTS_FAILURE = 'GET_FREE_EVENTS_FAILURE';


export const GET_PRO_EVENTS_REQUEST = 'GET_PRO_EVENTS_REQUEST';
export const GET_PRO_EVENTS_SUCCESS = 'GET_PRO_EVENTS_SUCCESS';
export const GET_PRO_EVENTS_FAILURE = 'GET_PRO_EVENTS_FAILURE';


//upload events
export const uploadEvent=(event , navigate)=>{
    return async (dispatch)=>{
        if(userUtil.getToken()){
            tokenUtil.setAuthToken(userUtil.getToken());
        }
        try{
            dispatch({type : UPLOAD_EVENT_REQUEST});
            let dataUrl = '/api/events/upload';
            let response = await Axios.post(dataUrl , event);
            dispatch({type : UPLOAD_EVENT_SUCCESS , payload : response.data});
            dispatch(alertAction.setAlert(response.data.msg , 'success'));
            navigate('/');

        }
        catch(error){
            dispatch({type :UPLOAD_EVENT_FAILURE , payload : error});
        }
    }
};

//get free events
export const getFreeEvents=()=>{
    return async (dispatch)=>{
        try{
            dispatch({type : GET_FREE_EVENTS_REQUEST});
            let dataUrl = '/api/events/free';
            let response = await Axios.get(dataUrl);
            dispatch({type : GET_FREE_EVENTS_SUCCESS , payload : response.data});
        }
        catch(error){
            dispatch({type: GET_FREE_EVENTS_FAILURE , payload : error});

        }
    }
};

//get pro events
export const getProEvents = ()=>{
    return async (dispatch)=>{
        if(userUtil.getToken()){
            tokenUtil.setAuthToken(userUtil.getToken());
        }
        try{
            dispatch({type : GET_PRO_EVENTS_REQUEST});
            let dataUrl  ='/api/events/pro'; 
            let response = await Axios.get(dataUrl);
            dispatch({type : GET_PRO_EVENTS_SUCCESS , payload : response.data});
        }
        catch(error){
            dispatch({type : GET_PRO_EVENTS_FAILURE , payload :error});
        }
    }
};