class BluetoothScanData {
    constructor(mac, rssi, reportHeader, deviceId, rawHexData) {
        this.mac = mac;
        this.rssi = rssi;
        this.reportHeader = reportHeader;
        this.deviceId = deviceId;
        this.rawHexData = rawHexData;
    }
}
