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
            this.client['stream'].on('error', this.__onError);
            this.client.on('connect', this.__onConnect);
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
            this.client.subscribe(topic, (error) => {
                if (error) {
                    throw error;
                }
            });
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
            logger.error(e);
        }
    }

    /**
     * fires when connection can't be established
     * but not when an established connection is lost
     * @param error
     * @private
     */
    __onError(error) {
        logger.error(error);
        this.client.end();
    }

    /**
     * fires when connection get established
     * @private
     */
    __onConnect() {
        logger.info('mqtt connection got established');
    }
}

export default MqttClient;
