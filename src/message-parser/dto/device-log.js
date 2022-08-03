
export default class DeviceLog {
    constructor(reading, readingType, unit, updatedDateTime, type, deviceId, deviceMac, rssi,
                xkDeviceId, rssi0M, rssi1M, gatewayId) {
        this.deviceId = deviceId;
        this.deviceMac = deviceMac;
        this.readingType = readingType;
        this.reading = reading;
        this.unit = unit;
        this.type = type;
        this.receivedSignalStrengthIdentifier = rssi;
        this.updatedDateTime = updatedDateTime;
        this.xkDeviceId = xkDeviceId;
        this.gatewayId = gatewayId;
        this.rssi0M = rssi0M;
        this.rssi1M = rssi1M;
        this.gatewayId = gatewayId;
    }
}
