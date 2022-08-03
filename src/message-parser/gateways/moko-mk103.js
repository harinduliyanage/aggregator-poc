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
import {pickDeviceParser} from "../utils/parser-picker";

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

     /**
     * get parse device id from device report data
     * @param {array} rawData
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
     * @param {array} rawData
     * @return {number}
     */
    getQuantityOfScannedData(rawData) {
        // in device report data the first index represent the device id length.
        const deviceIdLength = rawData[1] & 0xff; // 5
        // in device report data packet second index onward represent the device id.
        const deviceIdStartIndex = 2;
        // here we sum the device id length and device id start index. Then we can get the point which device id end
        const indexOfQtyScanData = deviceIdLength + deviceIdStartIndex;
        return rawData[indexOfQtyScanData] & 0xff;
    }

    /**
     * After received the row data packet then identified device gateway related data and device related data
     * @param {array} rawData
     * @returns {array}
     */
    getScannedBluetoothData(rawData) {
        /*Header value of device message decode */
        // in device report data the first index represent the device id length.
        const deviceIdLength = rawData[1] & 0xff;
        // in device report data packet second index onward represent the device id.
        const deviceIdStartIndex = 2;
        // calculating index of qty of scan data
        const indexOfQtyScanData = deviceIdLength + deviceIdStartIndex;
        // calculating device report data start index
        const deviceReportDataStartIndex = indexOfQtyScanData + 1;
        //
        const deviceReportDataBytes = DecodeUtil.sliceArray(rawData, deviceReportDataStartIndex,
            (deviceReportDataStartIndex + rawData.length));
        //
        return this.sliceBluetoothScanData(deviceReportDataBytes);
    }

    sliceBluetoothScanData(deviceReportDataBytes) {
        const scannedBluetoothDataList = [];
        const macAddressDataLength = 6;
        const rssiDataLength = 1;
        const broadcastLength = 1;

        let nextDataStart = 0;

        while (nextDataStart < deviceReportDataBytes.length) {
            // each data length decode
            const dataLength = deviceReportDataBytes[nextDataStart] & 0xff;

            // each data mac address decode
            const macAddressStartIndex = nextDataStart + 1;
            const macAddressBytes = DecodeUtil.sliceArray(deviceReportDataBytes, macAddressStartIndex,
                (macAddressStartIndex + macAddressDataLength));
            const macAddress = DecodeUtil.bytesToHexString(macAddressBytes);

            // each data rssi decode
            const rssiIndex = macAddressStartIndex + macAddressDataLength;
            const rssi = DecodeUtil.byteToInteger(deviceReportDataBytes[rssiIndex]);

            // each data broadcast data length decode
            const broadcastDataLengthIndex = rssiIndex + rssiDataLength;
            const broadcastDataLength = deviceReportDataBytes[broadcastDataLengthIndex] & 0xff;

            // each data broadcast data slice
            const broadcastDataStartIndex = broadcastDataLengthIndex + broadcastLength;
            const broadcastDataByte = DecodeUtil.sliceArray(deviceReportDataBytes, broadcastDataStartIndex,
                (broadcastDataStartIndex + broadcastDataLength));

            const broadcastData = DecodeUtil.bytesToHexString(broadcastDataByte);
            // each data broadcast name decode
            const broadcastNameStartIndex = broadcastDataStartIndex + broadcastDataLength;
            const broadcastNameLength = dataLength - (macAddressDataLength + rssiDataLength +
                broadcastLength + broadcastDataLength);

            let broadcastName = '';
            nextDataStart = broadcastDataStartIndex + broadcastDataLength;

            if (broadcastNameLength > 0) {
                const broadcastNameByte = DecodeUtil.sliceArray(deviceReportDataBytes, broadcastNameStartIndex,
                    (broadcastNameStartIndex + broadcastNameLength));
                broadcastName = DecodeUtil.hexToAscii(DecodeUtil.bytesToHexString(broadcastNameByte));
                nextDataStart = nextDataStart + broadcastNameLength;
            }
            //
            scannedBluetoothDataList.push({
                macAddress,
                rssi,
                broadcastData,
                broadcastName
            })

        }
        return scannedBluetoothDataList;
    }

    /**
     * Transform raw data packet into the sub parts (Device Mac, Device Id, Signal Identifier)
     * @param {*} scannedData
     * @returns {Array}
     */
    transformBluetoothData(scannedData) {
        const device = this.inMemoryData.getDeviceByMacAddress(scannedData.mac);
        let decodedReadings = [];
        if (device) {
            const parser = pickDeviceParser(device.deviceModel.make, device.deviceModel.model);
            decodedReadings = parser.parse(scannedData.rawHexData, scannedData.reportHeader);
            decodedReadings?.forEach(decodedReading => {
                decodedReading['deviceMac'] = scannedData.mac;
                decodedReading['receivedSignalStrengthIdentifier'] = scannedData.rssi;
                decodedReading['deviceId'] = scannedData.deviceId;
            });
        }
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
