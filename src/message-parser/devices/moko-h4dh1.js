/**
 * @file moko-h4dh1
 * @description - device report data parsing from moko h4dh1 device
 * here handle the all the data parsing logics related to the moko h4dh1 device by
 * refer Moko beacon advertising data format v1.1 - 2.3.4 BeaconX Pro - T&H sensor data
 */

import DecodeUtil from "../utils/decode-utils";
import Units from "../enum/units";
import ReadingTypes from "../enum/reading-types";
//
import DeviceLogBuilder from "../dto/device-log";

export default class MokoH4DH1 {
    /**
     * parsing device report data from row data by following device report data structure
     * @param {BluetoothScanData} bluetoothScanData
     * @return {DeviceLog[]}
     */
    parse(bluetoothScanData) {
        const eirPackets = this.__getEirPackets(bluetoothScanData.broadcastData);
        const parseData = [];
        //
        eirPackets.forEach(packet => {
            // 16 is hex value assigned numbers from bluetooth spec as general access profile
            // which representing service data, as per moko documentation h4dh1 device
            // sending sensor data inside of service data packet
            if (packet.type === '16') {
                const data = this.__decodeSensorData(packet);
                // when sensor sending t & H data frame type is 70
                if (data.frameType === '70') {
                    const temperature = new DeviceLogBuilder()
                        .setReading(data.temperature)
                        .setUnit(Units.CELSIUS)
                        .setReadingType(ReadingTypes.TEMPERATURE)
                        .setRssi0m(data.rssi0m)
                        .setDeviceName(bluetoothScanData.deviceName)
                        .setReceivedSignalStrengthIdentifier(bluetoothScanData.rssi)
                        .setCreatedAt(new Date())
                        .build();

                    const humidity = new DeviceLogBuilder()
                        .setReading(data.humidity)
                        .setUnit(Units.CELSIUS)
                        .setReadingType(ReadingTypes.HUMIDITY)
                        .setRssi0m(data.rssi0m)
                        .setDeviceName(bluetoothScanData.deviceName)
                        .setReceivedSignalStrengthIdentifier(bluetoothScanData.rssi)
                        .setCreatedAt(new Date())
                        .build();

                    //
                    parseData.push(temperature);
                    parseData.push(humidity);
                }
            }
        });

        return parseData;
    }

    /**
     * decode sensor data
     * @reference - Moko beacon advertising data format v1.1 - 2.3.4 BeaconX Pro - T&H sensor data
     * @example
     *  --------data format---------
     *  AB FE (2bytes) - uuid
     *  70 (1byte) - frame type
     *  00 (1byte) - rssi@0m
     *  0A (1byte) - add interval
     *  01 12 (2byte) - temperature
     *  01 EE (2byte) - humidity
     *  0C AF (2byte) - battery voltage
     *  03 (1byte) - rfu
     *  DE F1 46 35 99 8A (6byte) - mac address
     * @param packet
     * @return {{}}
     * @private
     */
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
        const frameType = DecodeUtil.bytesToHexString([packet.data[offset++]]);
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

        // the new firmware version - BXP series has additional information
        // it has 19 byte of data with battery voltage, rfu, mac address as additional data
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
