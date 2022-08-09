/**
 * @file - mongoose
 * @description - This module acts as the connection to mongo db using Mongoose.
 * Connection to mongo db is exported externally for all database connectivity usages.
 *
 * Mongoose is a mongo db object modeling tool designed to work in an asynchronous environment.
 * Mongoose supports both promises and callbacks.
 */

import * as mongoose from 'mongoose';
import {logger, config} from "../../../common";

// event binding for mongoose
mongoose.connection.once('open', () => {
    logger.info('mongo db event open');
    logger.debug('mongo db connected [%s]', config.DATABASE_URL);

    mongoose.connection.on('connected', () => {
        logger.info('mongo db event connected');
        // todo: import db model via index
    });

    mongoose.connection.on('disconnected', () => {
        logger.warn('mongo db event disconnected');
    });

    mongoose.connection.on('reconnected', () => {
        logger.info('mongo db event reconnected');
        // todo: import db model via index
    });

    mongoose.connection.on('error', (err) => {
        logger.error('mongo db event error: ' + err);
    });

    return Promise.resolve();
});


const connect = () => {
    return mongoose.connect(config.DATABASE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            logger.error('mongo db connection error: ' + err);
            if (err?.code === 18) {
                throw new Error('db authentication failed');
            }
        }
    });
}
// exporting mongoose object with database connection
export default connect;
