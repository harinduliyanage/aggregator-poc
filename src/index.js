import app from './app';
import {mqttMessageListener} from "./message-listener";

let server;
const port = 3000


server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    mqttMessageListener.connect();

})


const unexpectedErrorHandler = (error) => {
    console.log(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
