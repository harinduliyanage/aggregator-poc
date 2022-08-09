/**
 * @file - mongoose
 * @description - This module acts as the connection to mongo db using Mongoose.
 * Connection to mongo db is exported externally for all database connectivity usages.
 *
 * Mongoose is a mongo db object modeling tool designed to work in an asynchronous environment.
 * Mongoose supports both promises and callbacks.
 */

import mongoose from 'mongoose';
import {logger, config} from "../../../common";

const connect = () => {
    // event binding for mongoose
    mongoose.connection.once('open', () => {
        logger.info('mongo db event open');
        logger.debug(`mongo db connected ${config.DATABASE_URL}`);

        mongoose.connection.on('connected', () => {
            logger.info('mongo db event connected');
            require('../model/index');
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('mongo db event disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            logger.info('mongo db event reconnected');
            require('../model/index');
        });

        mongoose.connection.on('error', (err) => {
            logger.error('mongo db event error: ' + err);
        });

        return Promise.resolve();
    });
    return mongoose.connect(config.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            logger.error('mongo db connection error: ' + err);
            throw new Error(err);
        }
    });
}
// exporting mongoose object with database connection
export default connect;
