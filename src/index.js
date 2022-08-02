import app from './app';

let server;
const port = 3000

server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const exitHandler = (e) => {
    console.log(e);
};

const unexpectedErrorHandler = (error) => {
    console.log(error);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
