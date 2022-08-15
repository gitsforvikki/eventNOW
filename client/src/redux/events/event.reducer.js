import * as eventActions from './event.action';

export const eventFeaturesKey = 'events';

let initialState = {
    loading : false,
    events : [],
    errorMessage : ''
};

export const reducer =(state = initialState , action)=>{
    let {type , payload }=action;
    switch (type) {
        case eventActions.UPLOAD_EVENT_REQUEST :
            return{
                ...state,
                loading : true
            };
        case eventActions.UPLOAD_EVENT_SUCCESS : 
            return {
                ...state,
                loading :false
            };
        case eventActions.UPLOAD_EVENT_FAILURE :
            return{
                ...state,
                loading : false,
                errorMessage : payload
            };
        //get free events
        case eventActions.GET_FREE_EVENTS_REQUEST : 
            return{
                ...state,
                loading:true
            };
        case eventActions.GET_FREE_EVENTS_SUCCESS : 
            return {
                ...state,
                loading : false,
                events : payload.event
            };
        case eventActions.GET_FREE_EVENTS_FAILURE : 
            return{
                ...state,
                loading :false,
                errorMessage : payload
            };

        //get proevents
        case eventActions.GET_PRO_EVENTS_REQUEST : 
            return{
                ...state,
                loading:true
            };
        case eventActions.GET_PRO_EVENTS_SUCCESS : 
            return {
                ...state,
                loading : false,
                events : payload.event
            };
        case eventActions.GET_PRO_EVENTS_FAILURE : 
            return{
                ...state,
                loading :false,
                errorMessage : payload
            };

           
    
        default: return state;
            
    }
}