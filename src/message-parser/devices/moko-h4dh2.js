/**
 * @file Moko-H4DH2
 * @description
 * Device Report Data Parsing from Moko-H4DH2 Device
 * Here handle the all the parsing logics related to the Moko H4DH2 device. In this device we can get both temperature and humidity
 */

import DecodeUtil from "../utils/decode-utils";
import DeviceLog from "../dto/device-log";
import Units from "../enum/units";
import ReadingTypes from "../enum/reading-types";
import Types from "../enum/types";

export default class MokoH4DH2 {
    /**
     * parsing device report data from row data by following device report data structure
     * @param {Buffer} rawData
     * @param {number} reportHeader
     * @return {DeviceLog[]}
     */
    parse = (rawData, reportHeader) => {
        if (this.isVerifyAdvertisingFormat(reportHeader)) {
            const temperature = this.getTemperature(rawData);
            const humidity = this.getHumidity(rawData);
            return [
                new DeviceLog(temperature, ReadingTypes.TEMPERATURE, Units.CELSIUS, new Date(), Types.BTBM),
                new DeviceLog(humidity, ReadingTypes.HUMIDITY, Units.PERCENTAGE, new Date(), Types.BTBM),
            ];
        }
    }
    /**
     * Here we can get the temperature of the current data packet
     * @param {*} rawData
     * @returns {number}
     */
    getTemperature = (rawData) => {
        const startIndexOfTemperature = 26;
        const endIndexOfTemperature = 30;
        const converterValue = 10;
        const temperatureData = DecodeUtil.hexToInt(rawData.slice(startIndexOfTemperature, endIndexOfTemperature));
        return (temperatureData / converterValue).toFixed(2);
    }
    /**
     * Here we can get the Humidity of the current data packet
     * @param {string} rawData in hex format
     * @returns {number}
     */
    getHumidity = (rawData) => {
        const startIndexOfHumidity = 30;
        const endIndexOfHumidity = 34;
        const converterValue = 10;
        const humidityData = parseInt(rawData.slice(startIndexOfHumidity, endIndexOfHumidity), 16);
        return (humidityData / converterValue).toFixed(2);
    }
    /**
     * Validate received data packet
     * @param {number} reportHeader
     * @returns {boolean}
     */
    isVerifyAdvertisingFormat(reportHeader) {
        return reportHeader === 34;
    }
}
