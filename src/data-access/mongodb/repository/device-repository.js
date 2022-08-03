const BaseRepository = require('./base-repository')
const DeviceModel = require('../model/device-model')

/**
 * Device Repository defines all generic and custom functionality of database operations of the Device Module.
 */
class DeviceRepository extends BaseRepository {

    constructor() {
        /** Resolving the entity type of the user repository which is Device Model */
        super(DeviceModel);
    }

}

/** Exporting device repository. Please prevent using the repository directly, use only via the repository store. */
module.exports = DeviceRepository;