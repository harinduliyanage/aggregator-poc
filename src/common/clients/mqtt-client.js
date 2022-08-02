/**
 * @file - mqtt-client.js
 * @description - generic mqtt client
 */
import * as mqtt from "mqtt";
//
import {logger} from "../index";

class MqttClient {

    constructor() {
        this.client = {};
    }

    /**
     * use to make connection establish with the server
     * @param {string} url
     * @param config
     */
    connect(url, config) {
        try {
            this.client = mqtt.connect(url, config);
        } catch (e) {
            logger.error(e);
        }
    }

    /**
     * use to subscribe for particular topic
     * @param {string} topic
     */
    subscribe(topic) {
        try {
            this.client.subscribe(topic);
        } catch (e) {
            logger.error(e);
        }
    }

    /**
     * use to attach listeners for particular eventName
     * @param eventName
     * @param listener
     */
    addListener(eventName, listener) {
        try {
            this.client.addListener(eventName, listener);
        } catch (e) {
            console.error(e);
        }
    }
}

export default MqttClient;
