class BluetoothScanData {
    constructor(macAddress, rssi, broadcastData, broadcastName) {
        this.macAddress = macAddress;
        this.rssi = rssi;
        this.broadcastData = broadcastData;
        this.broadcastName = broadcastName;
        this.deviceName = '';
    }

    setDeviceName(name) {
        this.deviceName = name;
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
