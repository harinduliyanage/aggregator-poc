import app from './app';
import {mqttMessageListener} from "./message-listener";
import {config, logger} from "./common";

let server;
const port = config.PORT;


server = app.listen(port, () => {
    logger.info(`hdip aggregator app listening on port ${port}`)
    mqttMessageListener.connect();

})


const unexpectedErrorHandler = (error) => {
    logger.error(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
