/**
 * @file - device repository
 * @description - device repository defines all generic and custom functionality of database operations of the device entity.
 */
import BaseRepository from "./base-repository";
import Device from "../model/device.model";

class DeviceRepository extends BaseRepository {

    constructor() {
        // resolving the entity type of the user repository which is device entity
        super(Device);
    }

}
// exporting device repository. please prevent using the repository directly,
// use only via the repository store.
export default DeviceRepository;
