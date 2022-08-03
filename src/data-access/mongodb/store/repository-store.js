const DeviceRepository = require('../repository/device-repository')

/**
 * Repository store is to hold all available repositories. it acts as a generic layer for all repositories and reduces
 * the coupling between actual repositories and the usage.
 *
 * Avoid using repositories directly and implement via this repository store only.
 */
const RepositoryStore = Object.freeze({
    DeviceRepository : new DeviceRepository()
})

/**
 * Exporting the repository store for external usage.
 */
module.exports = RepositoryStore;