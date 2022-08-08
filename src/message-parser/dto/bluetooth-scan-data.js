export default class BluetoothScanData {
    constructor(macAddress, rssi, broadcastData, broadcastName) {
        this.macAddress = macAddress;
        this.rssi = rssi;
        this.broadcastData = broadcastData;
        this.broadcastName = broadcastName;
        this.deviceName = '';
        this.deviceId = '';
    }

    setDeviceName(name) {
        this.deviceName = name;
    }

    setDeviceId(deviceId) {
        this.deviceId = deviceId;
    }

    toString() {
        return `BluetoothScanData {\n
          macAddress: ${this.macAddress},\n
          rssi: ${this.rssi},\n
          broadcastData: ${this.broadcastData},\n
          broadcastName: ${this.broadcastName},\n
          deviceName: ${this.deviceName}\n
        }`
    }
}
