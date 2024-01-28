import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose, { model } from 'mongoose';
import {Book} from './model/bookmodel.js';
import cors from 'cors'
import bookRoute from './Routes/BookRoute.js'
const app = express();
//Middleware for Parsing request body
app.use(express.json());
//Middlewre for handling cors policy
//option 1 using default value and allow all  orgin
app.use(cors());
//option 2:allow costom orgin  
// app.use(cors({
//     origin:'http://localhost:3000', 
//     method:['GET','POST','PUT','DELETE'],
//     allowHeaders:['Content-Type']
// })); 
app.get('/',(request,reponse)=>{
    console.log(request)
    return reponse.status(234).send('welcome to MERN STACK')

});
app.use('/books',bookRoute);

mongoose.connect(mongoDBURL).then(()=>{
console.log('App connected to database');
app.listen(PORT,() =>{
    console.log(`App is listening to port: ${PORT}`)
});
}).catch((error)=>{
    console.log(error);
});