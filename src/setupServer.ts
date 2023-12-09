import {Application,json,urlencoded,Response,Request,NextFunction} from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookierSession from 'cookie-session';
import HTTP_STATUS from 'http-status-codes';
import 'express-async-errors';

const SERVER_PORT = 5000;

export class chattyServer{
    private app:Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }

    private securityMiddleware(app:Application) : void {
        app.use(
            cookierSession({
                name:"session",  //any name you want ( when we setup load balancer we are needing it)
                keys:['test1','test2'], // later into env variables
                maxAge : 24*7*60*60*1000,  // 7 days
                secure : false,  // we want https in production  then we need to set it to true in production server
            })
        )

        app.use(hpp());
        app.use(helmet());
        app.use(cors({
            origin: '*',  // later we are going to set it to client url
            credentials: true, // cookies wont work if this is not true
            optionsSuccessStatus:200, //older browsers like internet expolorers
            methods:['GET','POST','PUT','DELETE','OPTIONS']
        }))

        // now without cors we are not gonna able to make a request from out client to backend .
        //later we are gonna change origin in cors
    }

    private standardMiddleware(app:Application) : void {
        app.use(compression());
        app.use(json({limit:'50mb'}));  //exceeds more than 50mb throws an error 
        app.use(urlencoded({extended:true,limit:'50mb'}));


    }


    private routesMiddleware(app:Application) : void {}

    private globalErrorHandler(app:Application) : void {}

    private async startServer(app:Application) : Promise<void> {
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
        } catch (error) {
            console.log(error);
        }
    }

    private createSocketIO(httpServer: http.Server ) : void {}

    private startHttpServer(httpServer: http.Server) : void {
        httpServer.listen(SERVER_PORT,()=>{
            console.log(`Server running on port ${SERVER_PORT}`)
        })
    }

    

}  