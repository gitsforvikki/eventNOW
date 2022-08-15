import * as userAction from './user.action';

export const userFeaturesKey = 'users';

let initialstate = {
    loading: false,
    user :{},
    token:'',
    errorMessage:'',
    isAuthenticated : false
    
} ;


export const reducer  =(state = initialstate , actions )=>{
    let {type , payload} = actions;
    switch (type) {
        case userAction.REGISTER_USER_REQUEST  :
            return {
                ...state,
                loading :true
            };
        case userAction.REGISTER_USER_SUCCESS :
            return {
                ...state,
                loading :false
            };
        case userAction.REGISTER_USER_FAILURE : 
            return {
                ...state,
                loading :false,
                errorMessage : payload
            };

        case userAction.LOGIN_USER_REQUEST : 
            return {
                ...state,
                loading : true
            };
        case userAction.LOGIN_USER_SUCCESS : 
        localStorage.setItem('event-user-token' , payload.token);
            return{
                ...state,
                loading : false,
                token : payload.token,
                user :payload.user,
                isAuthenticated : true
            };
        case userAction.LOGIN_USER_FAILURE :
            localStorage.removeItem('event-user-token');
            return{
                ...state,
                loading:false,
                errorMessage : payload,
                isAuthenticated : false,
                token :'',
                user:{}
            };
        case userAction.CLICKED_LOGOUT : 
            localStorage.removeItem('event-user-token');
            return {
                ...state,
                token :'',
                isAuthenticated : false,
                user : {}
            }

        //get user
        case userAction.GET_USER_REQUEST  :
            return {
                ...state,
                loading :true
            };
        case userAction.GET_USER_SUCCESS :
            return {
                ...state,
                loading :false,
                user : payload.user
            };
        case userAction.GET_USER_FAILURE :
            return {
                ...state,
                loading :  false,
                errorMessage :payload
            };  
        default: return state;
            
    }
};


