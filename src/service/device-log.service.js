/**
 * @file device log service
 * @summary device log domain related business logics
 */
import {RepositoryStore} from "../data-access";

const deviceLogService = {

    /**
     * save multiple device logs at once
     * @param {[DeviceLog]} deviceLogs
     * @return {Promise<*>}
     */
    saveList: async (deviceLogs) => {
        return RepositoryStore.DeviceLogRepository.saveList(deviceLogs);
    }
}

export default deviceLogService;
