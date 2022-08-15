const jwt  = require('jsonwebtoken');

let authenticate= async(request , response ,next)=>{
    //get token
    let token = request.header('x-auth-token');
    if(!token){
        return response.status(401).json({msg : 'No Token , authorization denied'});
    };

    try{
        //verify token
        let decoded = await jwt.verify(token , process.env.jwt_secret_key);
        request.user = decoded.user;
        next();
    }
    catch (error) {
        response.status(401).json({msg : 'Token is not valid'});
    }
}
module.exports = authenticate;