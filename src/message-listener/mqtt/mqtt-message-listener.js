import {MqttClient, config, logger} from "../../common";

export const mqttMessageListener =  {

    connect: () => {
        const mqttClient = new MqttClient();
        const connectionUrl = `mqtt://${config.MQTT_HOST}`;
        logger.info(`connecting to message broker ${connectionUrl}`)
        //
        mqttClient.connect(connectionUrl, { keepalive: 5 });
        mqttClient.subscribe('#');
        mqttClient.addListener('message', listener);
    }
}



const listener = (topic, message, packet) => {
    console.log(packet.payload);
    // todo: step 1 using parser decode the raw msg

    // todo: step 2 get persist and other decision

    // todo: step 3 persist



}
