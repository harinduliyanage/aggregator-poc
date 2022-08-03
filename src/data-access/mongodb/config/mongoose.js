/**
 * This module acts as the connection to MongoDB using Mongoose. Connection to MongoDB is exported externally for
 * all database connectivity usages.
 *
 * Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both
 * promises and callbacks.
 */

/** External library Mongoose is imported for database connectivity purpose */
const mongoose = require('mongoose')
const {logger} = require("../../../common");

/**
 * Connection String is defined here only for the demonstrations purposes.
 * @type {string}
 */
const DATABASE_URL = "mongodb+srv://"
    + process.env.MONGODB_DATABASE_USERNAME
    + ":"
    + process.env.MONGODB_DATABASE_PASSWORD
    + "@"
    + process.env.MONGODB_DATABASE_CLUSTER_URL
    + "/"
    + process.env.MONGODB_DATABASE_DATABASE_NAME
    + "?retryWrites=true&w=majority";

/**
 * Configuration of the mongoose
 */
mongoose
    .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => logger.info("Error connecting to mongodb database : ", error))

mongoose.connection.on('open', () => {
    logger.info(`connected mongodb database with URL ${process.env.MONGODB_DATABASE_CLUSTER_URL}`);
})

/** Exporting mongoose object with database connection */
module.exports = mongoose
