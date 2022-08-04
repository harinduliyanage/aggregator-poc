/**
 * @file Moko-H4DH1
 * @description
 * Device Report Data Parsing from Moko-H4DH1 Device
 * Here handle the all the parsing logics related to the Moko H4DH1 device. In this device we can get both temperature and humidity
 */

import DecodeUtil from "../utils/decode-utils";
import DeviceLog from "../dto/device-log";
import Units from "../enum/units";
import ReadingTypes from "../enum/reading-types";
import Types from "../enum/types";


export default class MokoH4DH1 {
    /**
     * parsing device report data from row data by following device report data structure
     * @param {[]} broadcastRawData
     * @return {DeviceLog[]}
     */
    parse(broadcastRawData) {
        const eirPackets = this.__getEirPackets(broadcastRawData);
        const parseData = [];
        eirPackets.forEach(packet => {
            if (packet.type === '16') {
                const data = this.__decodeSensorData(packet);
                parseData.push(new DeviceLog(data.temperature, ReadingTypes.TEMPERATURE,
                    Units.CELSIUS, new Date(), Types.BTBM));
                parseData.push(new DeviceLog(data.humidity, ReadingTypes.HUMIDITY,
                    Units.CELSIUS, new Date(), Types.BTBM));
            }
        });
        return parseData;
    }


    __decodeSensorData(packet) {
        const uuidLength = 2;
        const temperatureLength = 2;
        const humidityLength = 2;
        const batteryVoltageLength = 2;
        const macLength = 6;
        //
        let offset = 0;
        let parseData = {};
        // decode uuid
        const uuid = DecodeUtil.sliceArray(packet.data, offset, (offset + uuidLength));
        offset += uuidLength;
        // decode frame type
        const frameType = packet.data[offset++];
        const rssi0m = packet.data[offset++];
        const addInterval = packet.data[offset++];
        // decode temperature
        const tempBytes = DecodeUtil.sliceArray(packet.data, offset, (offset + temperatureLength));
        offset += temperatureLength;
        const tempInt = DecodeUtil.hexToInt(DecodeUtil.bytesToHexString(tempBytes));
        const temperature = (tempInt / 10).toFixed(2);
        // decode humidity
        const humidityBytes = DecodeUtil.sliceArray(packet.data, offset, (offset + humidityLength));
        const humInt = parseInt(DecodeUtil.bytesToHexString(humidityBytes), 16);
        const humidity = (humInt / 10).toFixed(2);
        offset += humidityLength;

        parseData['uuid'] = uuid;
        parseData['frameType'] = frameType;
        parseData['rssi0m'] = rssi0m;
        parseData['addInterval'] = addInterval;
        parseData['temperature'] = temperature;
        parseData['humidity'] = humidity;
        if (packet.length === 19) {
            //
            const batteryBytes = DecodeUtil.sliceArray(packet.data, offset, (offset + batteryVoltageLength));
            offset += batteryVoltageLength;
            const batteryVoltage = parseInt(DecodeUtil.bytesToHexString(batteryBytes), 16);
            //
            const rfu = packet.data[offset++];
            const reservedForFutureUse = parseInt(DecodeUtil.bytesToHexString([rfu]), 16);
            const macBytes = DecodeUtil.sliceArray(packet.data, offset, (offset + macLength));
            const macAddress = DecodeUtil.bytesToHexString(macBytes);
            parseData['batteryVoltage'] = batteryVoltage;
            parseData['reservedForFutureUse'] = reservedForFutureUse;
            parseData['macAddress'] = macAddress;
        }
        return parseData;
    }


    /**
     * breakdown broadcast data into eir packets
     * @reference - Moko beacon advertising data format v1.1 - 2.3.4 BeaconX Pro - T&H sensor data
     * @example
     *  // first packet
     *  02 (1byte) - length
     *  01 (1byte) - type
     *  06 (1byte) - data
     *
     *  // second packet
     *  02 (1byte) - length
     *  0A (1byte) - type
     *  00 (1byte) - tx power
     *
     *  // third packet
     *  13 (1byte) - length
     *  16 (1byte) - type
     *  --------data---------
     *  AB FE (2bytes) - uuid
     *  70 (1byte) - frame type
     *  00 (1byte) - rssi@0m
     *  0A (1byte) - add interval
     *  01 12 (2byte) - temperature
     *  01 EE (2byte) - humidity
     *  0C AF (2byte) - battery voltage
     *  03 (1byte) - rfu
     *  DE F1 46 35 99 8A (6byte) - mac address
     * @private
     */
    __getEirPackets(broadcastData) {
        const splits = [];
        let offset = 0;
        while (offset < broadcastData?.length) {
            const length = broadcastData[offset++] & 0xff;
            const type = DecodeUtil.bytesToHexString([broadcastData[offset++]]);
            const dataLength = length - 1;
            const data = DecodeUtil.sliceArray(broadcastData, offset, (offset + dataLength));
            offset += dataLength;
            splits.push({length, type, data})
        }
        return splits;
    }
}
