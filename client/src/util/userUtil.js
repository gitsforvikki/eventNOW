export const isLogedIn = ()=>{
      if(localStorage.getItem('event-user-token')) {
        return true;
    } 
    else{
        return false
    }
};


export const getToken=()=>{
    return localStorage.getItem('event-user-token');
}