/**
 * @file - mqtt parser
 * @description - mqtt stream specific parser
 */
import * as deviceManager from "../utils/device-manager";
import MokoMk103 from "../gateways/moko-mk103";

export default class MqttParser {

    /**
     * mqtt msg parser constructor
     * @param {{devices: []}} options
     */
    constructor(options = {devices: []}) {
        // registering system devices in parser context
        deviceManager.saveRegisteredDevices(options.devices);
        // initializing gateway parser
        this.parser = new MokoMk103();
    }

    /**
     * msg parsing functionality
     * @param rawMessage
     * @return {{
     * scannedBluetoothData: BluetoothScanData[], decodedData: DeviceLog[],
     * qtyOfScanData: number, deviceId: string
     * }}
     */
    parse(rawMessage) {
        return this.parser.parse(rawMessage);
    }
}
