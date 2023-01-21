const express = require('express');
const dotEnv = require('dotenv');
const cors  = require('cors');
const { default: mongoose } = require('mongoose');
const path = require('path');



let app = express();

//config cors
app.use(cors());

//config dotenv
dotEnv.config();

//config express to receive form data
app.use(express.json());

const port = process.env.PORT || 5000;

//connect mongodb
mongoose.connect(process.env.MONGO_DB_CLOUD_URL).then((response)=>{
    console.log('mongoDB connected successfully.......');
}).catch((error)=>{
    console.log(error);
    process.exit(1);
});

//config routers
app.use('/api/users' , require('./router/userRouter'));
app.use('/api/events' , require('./router/eventsRouter'));

//dummy response from server
// app.get('/' , (request , response)=>{
//     response.send('Welcome to react events booking App.');
// })

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , 'client' , 'build')));
     app.get('/', (request,response) => {
         response.sendFile(path.join(__dirname , 'client' , 'build' , 'index.html'));
     });
 }

app.listen(port ,  ()=>{
    console.log(`Event-now  server started at port:${port}`);
});











// const app = express();

// //config dotenv
// dotenv.config();

// //config cors
// app.use(cors());

// //config express to accept json data
// app.use(express.json());

// const hostName = process.env.HOST_NAME;
// const port = process.env.PORT;



// //conect mongodb 
// mongoose.connect(process.env.MONGO_DB_LOCAL_URL).then((response)=>{
//     console.log('mongoDB connected successfully...........');
// }).catch((error)=>{
//     console.error(error);
//     process.exit(1);
// });

// app.use('/api' , require('./router/productRouter'));

// app.get('/' , (request , response)=>{
//     response.send(`<h2>Welcome to BigBasket Server Application</h2>`);

// })

// app.listen(port , hostName,()=>{
//     console.log(`Express serve is started at http://${hostName}:${port}`);
// } );