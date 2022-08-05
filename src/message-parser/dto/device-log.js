
export default class DeviceLog {

    #deviceId = '';
    #gatewayId = '';
    #deviceName = '';
    #readingType = '';
    #serviceSetIdentifier = '';
    #receivedSignalStrengthIdentifier = '';
    #reading = '';
    #unit = '';
    #rssi1m = '';
    #rssi0m = '';
    #devicePath = '';
    #createdAt = null;

    // We define a static Builder class within `DeviceLog`
    static Builder = class {
        // the builder class will have the same attributes as
        // the parent
        #deviceId = null;
        #gatewayId = null;
        #deviceName = null;
        #readingType = null;
        #serviceSetIdentifier = null;
        #receivedSignalStrengthIdentifier = null;
        #reading = null;
        #unit = null;
        #rssi1m = null;
        #rssi0m = null;
        #devicePath = null;
        #createdAt = null;

        // there are methods to set each of the attribute
        // attributes
        deviceId(deviceId) {
            this.#deviceId = deviceId;
            // each method returns the builder object itself
            // this allows for chaining of methods
            return this;
        }

        gatewayId(gatewayId) {
            this.#gatewayId = gatewayId;
            return this;
        }

        deviceName(deviceName) {
            this.#deviceName = deviceName;
            return this;
        }

        readingType(readingType) {
            this.#readingType = readingType;
            return this;
        }

        serviceSetIdentifier(serviceSetIdentifier) {
            this.#serviceSetIdentifier = serviceSetIdentifier;
            return this;
        }

        receivedSignalStrengthIdentifier(receivedSignalStrengthIdentifier) {
            this.#receivedSignalStrengthIdentifier = receivedSignalStrengthIdentifier;
            return this ;       }

        reading(reading){
            this.#reading = reading;
            return this ;       }

        unit(unit){
            this.#unit = unit
            return this ;       }

        rssi1m(rssi1m) {
            this.#rssi1m = rssi1m;
            return this;
        }

        rssi0m(rssi0m){
            this.#rssi0m = rssi0m;
            return this;
        }

        devicePath(devicePath) {
            this.#devicePath = devicePath;
            return this;
        }

        createdAt(createdAt) {
            this.#createdAt = createdAt;
            return this;
        }

        // when we're done setting arguments, we can call the build method
        // to give us the `DeviceLog` instance
        build() {
            return new DeviceLog(
                this.#deviceId,
                this.#gatewayId,
                this.#deviceName,
                this.#readingType,
                this.#serviceSetIdentifier,
                this.#receivedSignalStrengthIdentifier,
                this.#reading,
                this.#unit,
                this.#rssi0m,
                this.#rssi1m,
                this.#devicePath,
            );
        }
    }

    constructor(deviceId, gatewayId, deviceName, readingType, ssi, rssi, reading, unit, rssi0m, rssi1m, devicePath) {
        this.#deviceId = deviceId;
        this.#gatewayId = gatewayId;
        this.#deviceName = deviceName;
        this.#readingType = readingType;
        this.#serviceSetIdentifier = ssi;
        this.#receivedSignalStrengthIdentifier = rssi;
        this.#reading = reading;
        this.#unit = unit;
        this.#rssi1m = rssi1m;
        this.#rssi0m = rssi0m;
        this.#devicePath = devicePath;
    }
}
