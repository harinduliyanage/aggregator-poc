import "@babel/polyfill";
//
import app from './app';
import {mqttMessageListener, socketMessageListener} from "./message-listener";
import {connect} from "./data-access";
import {config, logger} from "./common";

let server;
const port = config.PORT;

// establishing the required external connection here
const connectionInitializer = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // initialize db connection
            connect();
            //
            socketMessageListener.connect();
            await mqttMessageListener.connect();
        } catch (e) {
            reject(e);
        }
    });
}

connectionInitializer().then(() => {
    // starting the express app
    server = app.listen(port, () => {
        logger.info(`hdip aggregator app listening on port ${port}`)
    });
})

const unexpectedErrorHandler = (error) => {
    logger.error(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
