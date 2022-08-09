import {RepositoryStore} from "../data-access";

const deviceService = {

    getAllDevices: async () => {
        return RepositoryStore.DeviceRepository.find({});
    }
}

export default deviceService;
