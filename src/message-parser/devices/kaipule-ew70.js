/**
 * @file kaipule-ew70
 * @description
 */
import DecodeUtil from "../utils/decode-utils";
import ReadingTypes from "../enum/reading-types";
//
import DeviceLogBuilder from "../dto/device-log";

export default class KaipuleEw70 {

    constructor() {
    }

    /**
     * parsing kaipule ew 70 broadcast data
     * @reference Kaipule Wireless Sensor Data(BLE Version) Communication Protocol
     * @param {BluetoothScanData} bluetoothScanData
     * @example
     *  02 (1byte) - add length
     *  01 (1byte) - add type
     *  06 (1byte) - mfg id
     *  09 08 69 53 65 6e 73 6f 72 (9byte) - device name
     *  20 (1byte) - device name terminator
     *  09 (1byte) - data length of sensor
     *  ff (1byte) - sensor data bit
     *  ----------Data-----------
     *  6f (1byte) - firmware version
     *  51 cc 34 (3byte) - device id
     *  49 (1byte) - type id
     *  01 (1byte) - event data (heart beat | tamper | alarm | battery report)
     *  7c (1byte) - control data
     *  86 (1byte) - checksum
     * --------total 23 byte------------
     */
    parse(bluetoothScanData) {
        const eventData = DecodeUtil.bytesToHexString([bluetoothScanData.broadcastData[20]]);
        return this.__decodeStatusData(bluetoothScanData, eventData);
    }


    /**
     *  broadcastData[20] index is representing (status data) as following table
     *  @param {BluetoothScanData} bluetoothScanData
     *  @param {String} eventData
     *  @example
     *  |   Binary  |   HEX  |   HEARTBEAT REPORT  |    BATTERY REPORT  |   ALARM REPORT  |   TAMPER REPORT  |
     *  | 00000001  |   01   |                     |                    |                 |         √        |
     *  | 00000010  |   02   |                     |                    |        √        |                  |
     *  | 00000011  |   03   |                     |                    |        √        |         √        |
     *  | 00000100  |   04   |                     |          √         |                 |                  |
     *  | 00000101  |   05   |                     |          √         |                 |         √        |
     *  | 00000110  |   06   |                     |          √         |        √        |                  |
     *  | 00000111  |   07   |                     |          √         |        √        |         √        |
     *  | 00001000  |   08   |          √          |                    |                 |                  |
     *  | 00001001  |   09   |          √          |                    |                 |         √        |
     *  | 00001010  |   A    |          √          |                    |        √        |                  |
     *  | 00001011  |   B    |          √          |                    |        √        |         √        |
     *  | 00001100  |   C    |          √          |          √         |                 |                  |
     *  | 00001101  |   D    |          √          |          √         |                 |         √        |
     *  | 00001110  |   E    |          √          |          √         |        √        |                  |
     *  | 00001111  |   F    |          √          |          √         |        √        |         √        |
     */
    __decodeStatusData(bluetoothScanData, eventData) {
        let parseData = [];

        switch (eventData) {
            case '01':
                parseData = this.__buildDeviceLogs(bluetoothScanData, [ReadingTypes.TAMPER]);
                break;
            case '02':
                parseData = this.__buildDeviceLogs(bluetoothScanData, [ReadingTypes.ALARM]);
                break;
            case '03':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.TAMPER, ReadingTypes.ALARM]);
                break;
            case '04':
                parseData = this.__buildDeviceLogs(bluetoothScanData, [ReadingTypes.LOW_BAT]);
                break;
            case '05':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.TAMPER, ReadingTypes.LOW_BAT]);
                break;
            case '06':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.LOW_BAT, ReadingTypes.ALARM]);
                break;
            case '07':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.LOW_BAT, ReadingTypes.ALARM, ReadingTypes.TAMPER]);
                break;
            case '08':
                parseData = this.__buildDeviceLogs(bluetoothScanData, [ReadingTypes.HEARTBEAT]);
                break;
            case '09':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.HEARTBEAT, ReadingTypes.TAMPER]);
                break;
            case 'A':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.HEARTBEAT, ReadingTypes.ALARM]);
                break;
            case 'B':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.HEARTBEAT, ReadingTypes.ALARM, ReadingTypes.TAMPER]);
                break;
            case 'C':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.HEARTBEAT, ReadingTypes.LOW_BAT]);
                break;
            case 'D':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.HEARTBEAT, ReadingTypes.LOW_BAT, ReadingTypes.TAMPER]);
                break;
            case 'E':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.HEARTBEAT, ReadingTypes.LOW_BAT, ReadingTypes.ALARM]);
                break;
            case 'F':
                parseData = this.__buildDeviceLogs(bluetoothScanData,
                    [ReadingTypes.HEARTBEAT, ReadingTypes.LOW_BAT, ReadingTypes.ALARM, ReadingTypes.TAMPER]);
                break;
            default:
                console.warn(`un supported status data received as kaipule ew70 - ${eventData}`);

        }
        return parseData;
    }

    /**
     * build readings log array as per device report data
     * @param bluetoothScanData
     * @param reportedStatusData
     * @return {*[]}
     * @private
     */
    __buildDeviceLogs(bluetoothScanData, reportedStatusData) {
        const date = new Date();
        const alarmReport = new DeviceLogBuilder()
            .setReading(0)
            .setReadingType(ReadingTypes.ALARM)
            .build();

        const batteryReport = new DeviceLogBuilder()
            .setReading(0)
            .setReadingType(ReadingTypes.LOW_BAT)
            .build();

        const tamperReport = new DeviceLogBuilder()
            .setReading(0)
            .setReadingType(ReadingTypes.TAMPER)
            .build();

        const heartBeatReport = new DeviceLogBuilder()
            .setReading(0)
            .setReadingType(ReadingTypes.HEARTBEAT)
            .build();

        const response = [alarmReport, batteryReport, tamperReport, heartBeatReport];
        response.forEach(data => {
            const found = reportedStatusData.find(statusData => {
                if (statusData === data['readingType']) {
                    return statusData;
                }
            })
            if (found) {
                data['reading'] = 1;
            }
            data['receivedSignalStrengthIdentifier'] = bluetoothScanData.rssi;
            data['deviceId'] = bluetoothScanData.deviceId;
            data['deviceName'] = bluetoothScanData.deviceName;
            data['createdAt'] = date;
        });
        return response;
    }
}
