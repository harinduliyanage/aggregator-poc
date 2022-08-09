/**
 * @file - device log repository
 * @description - device log repository defines all generic and custom functionality
 * of database operations of the device entity.
 */
import BaseRepository from "./base.repository";
import DeviceLog from "../model/device-log.model";

class DeviceLogRepository extends BaseRepository {

    constructor() {
        // resolving the entity type of the user repository which is device entity
        super(DeviceLog);
    }

}
// exporting device repository. please prevent using the repository directly,
// use only via the repository store.
export default DeviceLogRepository;
