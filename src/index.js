import "@babel/polyfill";
//
import app from './app';
import {mqttMessageListener, socketMessageListener} from "./message-listener";
import {connect} from "./data-access";
import {config, logger} from "./common";

let server;
const port = config.PORT;


server = app.listen(port, () => {
    logger.info(`hdip aggregator app listening on port ${port}`)
    //
    connect();
    mqttMessageListener.connect();
    socketMessageListener.connect();
});


const unexpectedErrorHandler = (error) => {
    logger.error(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
