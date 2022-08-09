/**
 * @file device service
 * @summary device domain related business logics
 */
import {RepositoryStore} from "../data-access";

const deviceService = {

    /**
     * get all registered devices
     * @return {Promise<*[]>}
     */
    getAllDevices: async () => {
        return RepositoryStore.DeviceRepository.find({});
    }
}

export default deviceService;
