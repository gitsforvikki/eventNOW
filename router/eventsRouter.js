const { request, response } = require('express');
const express  = require('express');
const router = express.Router();
const {body , validationResult}  = require('express-validator');
const authenticate  = require('../middleware/authentication');
const Event = require('../model/Events');


//upload event
router.post('/upload',authenticate ,[
    body('name').notEmpty().withMessage('Name required.'),
    body('image').notEmpty().withMessage('Image required.'),
    body('date').notEmpty().withMessage('Date required.'),
    body('type').notEmpty().withMessage('Type required.'),
    body('price').notEmpty().withMessage('Price required.'),
    body('info').notEmpty().withMessage('Information required.')

] , async (request , response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors :errors.array()});
    }
    try{
        let  {name , image , date , type , price , info} = request.body;
        let user = request.user.id;
        //save to database
        let event = new Event({user , name , image , date , type , price , info});
        event = await event.save();
        response.status(200).json({msg:'Event upload success.'});      
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            errors : [{msg : errors.message }]
        })
    }
    
});


//get free events
router.get('/free', async(request , response)=>{
   try{
        //check if any events is available or not
        let events = await Event.find({type : 'FREE'});
        if(events.length == 0){
            return response.status(401).json({ msg : 'No FREE events'});
        };
        response.status(200).json({
            event : events
        })

   }
   catch(error){
       console.log(error);
       response.status(500).json({
           errors : [{errors : errors.message}]
       })

   }
});




//getting pro events
router.get('/pro',authenticate, async(request, response)=>{
    try{
        let events = await Event.find({type : 'PRO'});
        if(events.length == 0){
            return response.status(401).json({ msg : 'No PRO events'});
        };
        response.status(200).json({
            event : events
        })
    }
    catch(error){
        console.log(error);
        response.status(500).json({
            errors : [{errors : errors.message}]
        })
 
    }
});



module.exports = router;