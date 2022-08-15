const { request, response } = require('express');
const express  = require('express');
const router = express.Router();
const {body , validationResult} =  require('express-validator');
const User  =  require('../model/Users');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt =  require('jsonwebtoken');
const authenticate = require('../middleware/authentication');


//register
router.post('/register',[
    body('name').notEmpty().withMessage('Name required'),
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is required')
],async (request  ,response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors  : errors.array()});
    }
    try{

        let {name , email , password} = request.body;
        //check if user already exist or not
        let isExist = await User.findOne({email : email});
        if(isExist){
            return response.status(401).json({
                errors : [
                    {msg : 'User already exist'  }
                ]
            })
        }

        //encrypt password
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password , salt);

        //get avatar
        let avatar = gravatar.url(email ,{
            s:'200',
            r:'pg',
            d :'mm'
        });

        //isAdmin
        let isAdmin =  false;

        //save to database
        let user = new User({name , email , password , avatar , isAdmin });
        user = await user.save();

        response.status(200).json({
            msg : 'Registeration success'
        });
    }
    catch(error){
        response.status(500).json({
            errors : [
                { msg : error.message }
            ]
        });
    }
});


//login
router.post('/login',[
    body('email').notEmpty().withMessage('Email required'),
    body('password').notEmpty().withMessage('Password required')
] ,async(request, response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()});
    }
    try{
        let {email , password } = request.body;
        //check if user is registered or not
        let user = await User.findOne({email:email});
        if(!user){
            return response.status(401).json({errors : [{msg : 'Invalid Credentials'}]});
        }
        // check or compare password
        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return response.status(401).json({errors : [{msg : 'Invalid Credentials.'}]})
        };

        //create token

        let payload ={
            user:{
                id :user.id,
                name:user.name
            }
        };
        jwt.sign(payload , process.env.jwt_secret_key , (error , token)=>{
            if(error) throw error;
            response.status(200).json({
                msg : 'Login Successful!',
                token : token,
                user :user
            })
        })


    }
    catch(error){
        response.status(500).json({
            errors : [{msg : error.message }]
        })
    }
    
});


//get user
router.get('/' , authenticate , async(request , response)=>{
    try{
        let user = await User.findOne({_id : request.user.id });
        response.status(200).json({user : user});
    }
    catch(error){
        response.status(500).json({
            errors : [{msg : error.message}]
        })
    }
});


module.exports = router;