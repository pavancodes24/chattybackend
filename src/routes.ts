import { Application } from "express";

export default (app:Application) =>{
    const routes = ()=>{
        app.use('/api/v1/testing')  //later ...
    }

    routes();
}