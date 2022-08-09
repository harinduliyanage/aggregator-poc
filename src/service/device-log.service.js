import {RepositoryStore} from "../data-access";

const deviceLogService = {

    saveList: async (deviceLogs) => {
        return RepositoryStore.DeviceLogRepository.saveList(deviceLogs);
    }
}

export default deviceLogService;
