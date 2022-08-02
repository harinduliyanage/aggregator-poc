import io from 'socket.io-client';
import {logger} from "../index";

class SocketClient {

    constructor() {
        this.client = {};
    }

    /**
     * use to establish socket connection
     * @param {string} url - connection url
     * @param {*} options - for parse some configs
     */
    connect(url, options) {
        logger.info(`connecting to socket ${url}`);
        this.client = io(url);
        this.client.on('connect', this.__onConnect);
    }

    /**
     * use to subscribe a particular socket channel
     * @param {string} eventName - subscribing channel name
     * @param {function} callback - callback fn
     */
    eventBind(eventName, callback) {
        this.client.on(eventName, callback);
    }

    /**
     * fires when connection get established
     * @private
     */
    __onConnect() {
        logger.info('socket connection got established');
    }
}

export default SocketClient;
