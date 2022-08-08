import * as parserContext from "../context/parser-context";

export const getDeviceByMacAddress = (macAddress) => {
    const devices = getRegisteredDevices();
    return devices?.find(device => {
        if (device.macAddress === macAddress) {
            return device;
        }
    });
}

export const saveRegisteredDevices = (devices) => {
    parserContext.save('REGISTERED_DEVICES', devices);
}

export const getRegisteredDevices = () => {
     return parserContext.get('REGISTERED_DEVICES');
}
