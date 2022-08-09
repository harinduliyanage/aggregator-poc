import {MqttClient, config, logger} from "../../common";
import {MqttParser} from "../../message-parser";
//
import deviceService from "../../service/device-service";
import deviceLogService from "../../service/device-log.service";
//
const devices = deviceService.getAllDevices();
const parser = new MqttParser();

export const mqttMessageListener = {

    connect: () => {
        const mqttClient = new MqttClient();
        const connectionUrl = `mqtt://${config.MQTT_HOST}`;
        logger.info(`connecting to message broker ${connectionUrl}`)
        //
        mqttClient.connect(connectionUrl, {keepalive: 5});
        mqttClient.subscribe('#');
        mqttClient.addListener('message', listener);
    }
}

/**
 * mqtt message listener
 * @param topic - topic name
 * @param message -
 * @param packet - mqtt packet
 */
const listener = (topic, message, packet) => {
    // step 1 using parser decode the raw msg
    const data = parser.parse(packet.payload);

    // step 2 persist
    if (data?.decodedData && data?.decodedData?.length > 0) {
        deviceLogService.saveList(data.decodedData);
    }
}


