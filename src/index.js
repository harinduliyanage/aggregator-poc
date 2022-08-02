import app from './app';
import {mqttMessageListener} from "./message-listener";
import {config} from "./common";

let server;
const port = config.PORT;


server = app.listen(port, () => {
    console.log(`hdip aggregator app listening on port ${port}`)
    mqttMessageListener.connect();

})


const unexpectedErrorHandler = (error) => {
    console.log(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
