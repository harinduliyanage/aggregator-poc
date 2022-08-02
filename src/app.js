import express from 'express';
//
const app = express();

app.get('/', (req, res) => {
    res.send('HDIP Aggregator!')
})

export default app;
