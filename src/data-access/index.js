/**
 * This exports the database access layer.
 */
const RepositoryStore = require('./mongodb/store/repository-store')

/** Exporting repository store for the external usage. */
module.exports = {
    RepositoryStore
}