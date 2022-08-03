/**
 * @file Moko-Mk103
 * @description
 * Device Report Data Parsing from Moko MK103 Gateway
 * Scanned Bluetooth Data Structure (MAC Address,RSSI,raw data)
 * @example
 *    Key:0x21
 *    Device publish：21 03 31 30 33 02 12  00 26 37 71 8d dc d5
 *    05 01 02 03 04 05 31 31 32 32 35 10 00 26 37 71 8d dc d5 05 01 02 03 04 05
 *    31 31 32
 *
 *    Description:
 *
 *    Frame header：0x21
 *    Device id length(1Byte)：03
 *    Device id(3Bytes):31 30 33
 *
 *    Quantities of scanned data：02
 *
 *    Information of the first scanned device:
 *
 *    First data length(1Byte)：12
 *    MAC address(6Bytes)： 00 26 37 71 8d dc
 *    RSSI: d5(-43dB)
 *    Broadcast data length(1Byte)：05
 *    Broadcast raw data(5Bytes)：01 02 03 04 05
 *    Broadcast name：31 31 32 32 35(11225)
 *
 *    Information of the second scanned device:
 *
 *    Second data length(1Byte)：10
 *    MAC address(6Bytes)： 00 26 37 71 8d 1d
 *    RSSI: d5(-43dB)
 *    Broadcast data length(1Byte)：05
 *    Broadcast raw data(5Bytes)：01 02 03 04 05
 *    Broadcast name：31 30 33(103)
 */
import BluetoothScanData from "../dto/bluetooth-scan-data";
//
import DecodeUtil from "../utils/decode-utils";
import { pickDeviceParser } from "../utils/parser-picker";

export default class MokoMk103 {

    constructor(inMemoryData) {
        /**
         * 0x21 is a data key which represent in first byte of device report data as frame header
         * @reference http://doc.mokotechnology.com/index.php?s=/page/153#4.4%20Device%20Report%20Data
         * @type {number}
         */
        this.frameHeader = 0x21;
        this.inMemoryData = inMemoryData;
    }

    /**
     * parsing device report data from row data by following device report data structure
     * @param {Buffer} rawData
     * @return {{
     *  scannedBluetoothData: [{macAddress: string, rssi: string, broadcastRawData: Buffer}],
     *  qtyOfScanData: number,
     *  deviceId: string
     * }}
     */
    parse(rawData) {
        if (this.isVerifyAdvertisingFormat(rawData)) {
            const deviceId = this.getDeviceId(rawData);
            const qtyOfScanData = this.getQuantityOfScannedData(rawData);
            const scannedBluetoothData = this.getScannedBluetoothData(rawData);
            return {
                deviceId,
                qtyOfScanData,
                scannedBluetoothData
            }
        } else {
            console.info('un verified row data received');
        }
    }
    /**
     * get parse device id from device report data
     * @param {Buffer} rawData
     * @return {string}
     */
    getDeviceId(rawData) {
        // in device report data the first index represent the device id length.
        const deviceIdLength = rawData[1] & 0xff;
        // in device report data packet from second index onward represent the device id.
        const deviceIdStartIndex = 2;

        // slice the device id represent bytes and transfer bytes into -> hex -> ascii
        const deviceIdBytes = DecodeUtil.sliceArray(rawData, deviceIdStartIndex, deviceIdLength);
        const deviceIdHexValue = DecodeUtil.bytesToHexString(deviceIdBytes);
        return DecodeUtil.hexToAscii(deviceIdHexValue);
    }
    /**
     * get parse qty of scan data from device report data
     * @param {Buffer} rawData
     * @return {number}
     */
    getQuantityOfScannedData(rawData) {
        // in device report data the first index represent the device id length.
        const deviceIdLength = rawData[1] & 0xff;
        // in device report data packet second index onward represent the device id.
        const deviceIdStartIndex = 2;
        // here we sum the device id length and device id start index. Then we can get the point which device id end
        const indexOfQtyScanData = deviceIdLength + deviceIdStartIndex;
        return rawData[indexOfQtyScanData];
    }
    /**
     * After received the row data packet then identified device gateway related data and device related data
     * @param {*} rawData
     * @returns {Array}
     */
    getScannedBluetoothData(rawData) {
        const scannedBluetoothDataList = [];
        /*Header value of device message*/
        // “& 0xff” effectively masks the variable so it leaves only the value in the last 8 bits, and ignores all the rest of the bits.
        const deviceIdLength = rawData[1] & 0xff;
        const deviceIdStartIndex = 2;
        const macAddressLength = 6;
        /*Get gateway id from device message start index*/
        const deviceIdBytes = DecodeUtil.sliceArray(rawData, deviceIdStartIndex, deviceIdLength);
        const deviceId = DecodeUtil.hexToAscii(DecodeUtil.bytesToHexString(deviceIdBytes));
        /*Load device messages array*/
        let deviceBytes = DecodeUtil.sliceArray(rawData, (3 + deviceIdLength), rawData.length);
        for (let i = 0, l = deviceBytes?.length; i < l;) {
            /*Device report header*/
            let deviceReportHeader = deviceBytes[i];
            i++;
            /*Mac address of device*/
            const macBytes = DecodeUtil.sliceArray(deviceBytes, i, (i + macAddressLength));
            const mac = DecodeUtil.bytesToHexString(macBytes);

            if (this.inMemoryData.isDeviceExistsForGivenMac(mac)) {
                i += macAddressLength;
                const rssi = DecodeUtil.byteToInteger(deviceBytes[i]);
                i++;
                /*Device raw data length*/
                // “& 0xff” effectively masks the variable so it leaves only the value in the last 8 bits, and ignores all the rest of the bits.
                const rawDataLength = deviceBytes[i] & 0xff;
                i++;
                /*Device message raw information data*/
                const broadcastRawDataBytes = DecodeUtil.sliceArray(deviceBytes, i, (i + rawDataLength));
                const broadcastRawData = DecodeUtil.bytesToHexString(broadcastRawDataBytes);
                i += rawDataLength;
                /*Add device info to message count*/
                let deviceInfoCount = rawDataLength - 8 - rawDataLength;
                i += deviceInfoCount;
                /*Create platform raw header message object*/
                const scannedData = new BluetoothScanData(mac, rssi, deviceReportHeader, broadcastRawData, deviceId);
                //
                const transformedData = this.transformBluetoothData(scannedData);
                transformedData?.forEach(data => {
                    scannedBluetoothDataList.push(data);
                });
            }
            return scannedBluetoothDataList;
        }
    }
    /**
     * Transform raw data packet into the sub parts (Device Mac, Device Id, Signal Identifier)
     * @param {*} scannedData
     * @returns {Array}
     */
    transformBluetoothData(scannedData) {
        const device = this.inMemoryData.getDeviceByMacAddress(scannedData.mac);
        const parser = pickDeviceParser(device.deviceModel.make, device.deviceModel.model);
        const decodedReadings = parser.parse(scannedData.rawHexData, scannedData.reportHeader);
        decodedReadings?.forEach(decodedReading => {
            decodedReading['deviceMac'] = scannedData.mac;
            decodedReading['receivedSignalStrengthIdentifier'] = scannedData.rssi;
            decodedReading['deviceId'] = scannedData.deviceId;
        });
        return decodedReadings;
    }
    /**
     * verifying frame header of device report data as per Moko Communication Protocol V1.0 doc
     * @reference http://doc.mokotechnology.com/index.php?s=/page/153#4.4%20Device%20Report%20Data
     * @param {Buffer} rawData
     * @return {boolean}
     */
    isVerifyAdvertisingFormat(rawData) {
        if (typeof rawData[0] !== 'undefined') {
            // “& 0xff” effectively masks the variable so it leaves only the value in the last 8 bits, and ignores
            // all the rest of the bits.
            const header = rawData[0] & 0xff;
            if (header === this.frameHeader) {
                return true;
            }
        }
        return false;
    }

}
