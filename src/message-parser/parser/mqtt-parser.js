import *as deviceManager from "../utils/device-manager";
import MokoMk103 from "../gateways/moko-mk103";

export default class MqttParser {

    /**
     * mqtt msg parser constructor
     * @param {{devices: []}} options
     */
    constructor(options = {devices: []}) {
        // registering system devices in parser context
        deviceManager.saveRegisteredDevices(options.devices);
        this.parser = new MokoMk103();
    }

    parse(rawMessage) {
        return this.parser.parse(rawMessage);
    }
}
