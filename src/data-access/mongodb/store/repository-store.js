/**
 * @file - repository store
 * @description - repository store is to hold all available repositories.
 * it acts as a generic layer for all repositories and reduces
 * the coupling between actual repositories and the usage.
 *
 * avoid using repositories directly and implement via this repository store only.
 */

import DeviceRepository from "../repository/device-repository";
//
const RepositoryStore = Object.freeze({
    DeviceRepository : new DeviceRepository()
})

// exporting the repository store for external usage.
export default RepositoryStore;
