import dotenv from 'dotenv';


dotenv.config({});

class Config{
    public DATABASE_URL : string | undefined;
    public JWT_TOKEN : string | undefined;
    public NODE_ENV : string | undefined;
    public SECRET_KEY_ONE : string | undefined;
    public SECRET_KEY_TWO : string | undefined;
    public CLIENT_URL : string | undefined;

    private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/chattyapp-backend'

    constructor(){
        this.DATABASE_URL = process.env.DATABASE_URL || this.DATABASE_URL;
        this.DATABASE_URL = process.env.JWT_TOKEN || '1234';
        this.DATABASE_URL = process.env.NODE_ENV || '';
        this.DATABASE_URL = process.env.SECRET_KEY_ONE || '';
        this.DATABASE_URL = process.env.SECRET_KEY_TWO || '';
        this.DATABASE_URL = process.env.CLIENT_URL || '';
    }

    public validateConfig(): void {
        for(const [key,value] of Object.entries(this)){
            if(value === undefined){
                throw new Error(`Configuration ${key} is undefined.`)
            }
            
        }
    }

}

export const config: Config= new Config()