import * as alertActions from './alert.action';

export const alertFeatureKey = 'alert';

let initialState=[];

export const reducer=(state = initialState , actions)=>{
    let {type , payload} =actions;
    switch (type) {
        case alertActions.SET_ALERT :
            return [...state , payload];
        case alertActions.REMOVE_ALERT : 
            return state.filter(alert =>alert.id !== payload );
        default : return state;   
           
    }
};
