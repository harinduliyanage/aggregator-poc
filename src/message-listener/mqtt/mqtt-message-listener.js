import {MqttClient, config, logger} from "../../common";
import {MqttParser} from "../../message-parser";
import MokoH4DH2 from "../../message-parser/devices/moko-h4dh2";
import MokoH4DH1 from "../../message-parser/devices/moko-h4dh1";

// mock data
const options = {
    devices:
        [
           /*{
                deviceId:'00001',
                deviceName:'Moko Test 1',
                macAddress: 'e9879ebf06af',
                deviceModel: {
                    make: 'MOKO',
                    model: 'H4DH1'
                }
            },
            {
                deviceId:'00002',
                deviceName:'Moko Test 2',
                macAddress: 'd5e940a98e20',
                deviceModel: {
                    make: 'MOKO',
                    model: 'H4DH1'
                }
            },*/
            {
                deviceId:'00003',
                deviceName:'Kaipule Test 1',
                macAddress: 'b87c6f51cc34',
                deviceModel: {
                    make: 'Kaipule',
                    model: 'EW70'
                }
            }
        ]
}

const parser = new MqttParser(options);

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


const listener = (topic, message, packet) => {
    const response = parser.parse(packet.payload);
    console.log(response?.decodedData)
    // todo: step 1 using parser decode the raw msg

    // todo: step 2 get persist and other decision

    // todo: step 3 persist


}


