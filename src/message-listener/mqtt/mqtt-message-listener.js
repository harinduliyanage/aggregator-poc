import {MqttClient, config, logger} from "../../common";
import {MqttParser} from "../../message-parser";
//
import deviceService from "../../service/device-service";
import deviceLogService from "../../service/device-log.service";
//
let parser;

export const mqttMessageListener = {

    connect: async () => {
        const mqttClient = new MqttClient();
        const connectionUrl = `mqtt://${config.MQTT_HOST}`;
        logger.info(`connecting to message broker ${connectionUrl}`)
        //
        mqttClient.connect(connectionUrl, {keepalive: 5});
        mqttClient.subscribe('#');
        // loading registered devices from db and injecting those into parser
        const devices = await deviceService.getAllDevices();
        parser = new MqttParser({devices});
        // attaching a listener for msg stream
        mqttClient.addListener('message', listener);
    }
}

/**
 * mqtt message listener
 * @param topic - topic name
 * @param message -
 * @param packet - mqtt packet
 */
const listener = async (topic, message, packet) => {
    // step 1 using parser decode the raw msg
    const data = parser.parse(packet.payload);

    // step 2 persist
    if (data?.decodedData && data?.decodedData?.length > 0) {
        await deviceLogService.saveList(data.decodedData);
    }
}


