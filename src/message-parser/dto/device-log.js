/**
 * @file - device-log
 * @description - decoded broadcast data transfer object
 */
export class DeviceLog {

    constructor(deviceId, gatewayId, deviceName, readingType, ssi, rssi,
                reading, unit, rssi0m, rssi1m, devicePath) {
        this.deviceId = deviceId;
        this.gatewayId = gatewayId;
        this.deviceName = deviceName;
        this.readingType = readingType;
        this.serviceSetIdentifier = ssi;
        this.receivedSignalStrengthIdentifier = rssi;
        this.reading = reading;
        this.unit = unit;
        this.rssi1m = rssi1m;
        this.rssi0m = rssi0m;
        this.devicePath = devicePath;
    }
}


export default class DeviceLogBuilder {

    constructor() {
        this.deviceId = '';
        this.gatewayId = '';
        this.deviceName = '';
        this.readingType = '';
        this.serviceSetIdentifier = '';
        this.receivedSignalStrengthIdentifier = '';
        this.reading = '';
        this.unit = '';
        this.rssi1m = '';
        this.rssi0m = '';
        this.devicePath = '';
    }

    // there are methods to set each of the attribute
    // attributes
    setDeviceId(deviceId) {
        this.deviceId = deviceId;
        // each method returns the builder object itself
        // this allows for chaining of methods
        return this;
    }

    setGatewayId(gatewayId) {
        this.gatewayId = gatewayId;
        return this;
    }

    setDeviceName(deviceName) {
        this.deviceName = deviceName;
        return this;
    }

    setReadingType(readingType) {
        this.readingType = readingType;
        return this;
    }

    setServiceSetIdentifier(serviceSetIdentifier) {
        this.serviceSetIdentifier = serviceSetIdentifier;
        return this;
    }

    setReceivedSignalStrengthIdentifier(receivedSignalStrengthIdentifier) {
        this.receivedSignalStrengthIdentifier = receivedSignalStrengthIdentifier;
        return this;
    }

    setReading(reading) {
        this.reading = reading;
        return this;
    }

    setUnit(unit) {
        this.unit = unit
        return this;
    }

    setRssi1m(rssi1m) {
        this.rssi1m = rssi1m;
        return this;
    }

    setRssi0m(rssi0m) {
        this.rssi0m = rssi0m;
        return this;
    }

    setDevicePath(devicePath) {
        this.devicePath = devicePath;
        return this;
    }

    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    // when we're done setting arguments, we can call the build method
    // to give us the `DeviceLog` instance
    build() {
        return new DeviceLog(
            this.deviceId,
            this.gatewayId,
            this.deviceName,
            this.readingType,
            this.serviceSetIdentifier,
            this.receivedSignalStrengthIdentifier,
            this.reading,
            this.unit,
            this.rssi0m,
            this.rssi1m,
            this.devicePath,
        );
    }
}
