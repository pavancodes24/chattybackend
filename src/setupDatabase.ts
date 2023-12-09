import mongoose, { mongo } from "mongoose";
import {config} from './config';

export default ()=>{  // anonymous function 
    const connect = () =>{
        mongoose.connect(`${config.DATABASE_URL}`)  // after 27017 name is user wish and this will be database name , we will get this from env in later stage
            .then(()=>{
                console.log('sucessfully connected to database.');  // change console.log to different login library later stage
            }) 
            .catch((error)=>{
                console.log('Error connecting to database', error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on('disconnected',connect); 
}