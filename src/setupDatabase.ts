import mongoose, { mongo } from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  // anonymous function
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`) // after 27017 name is user wish and this will be database name , we will get this from env in later stage
      .then(() => {
        log.info('successfully connected to database.'); // change console.log to different login library later stage
      })
      .catch((error) => {
        log.error('Error connecting to database', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
