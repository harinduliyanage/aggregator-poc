/**
 * @file Parser utils
 * @summary The file used to defined common function need to transform one format to another format for an example
 * you need to convert hex to ascii you can call hex2ascii() function using importing this file,
 */
const DecodeUtil = {

    /**
     * Convert hex value to ascii value
     * @param {string} hexValue
     * @returns {string}
     */
    hexToAscii: (hexValue) => {
        /* Force conversion*/
        const hex = hexValue.toString();
        let str = '';
        for (let i = 0; i < hex?.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    },
    /**
     * Convert byte array to hex value
     * @param {Array} byteArray
     * @returns {string}
     */
    bytesToHexString: (byteArray) => {
        return Buffer.from(byteArray).toString('hex');
    },
    /**
     * Getting specific array data getting range
     * @param {Array} array
     * @param {number} from
     * @param {number} to
     * @returns {Array}
     */
    sliceArray: (array, from, to) => {
        return array?.slice(from, to);
    },
    /**
     * Convert buffer to byte array
     * @param {buffer} buffer
     * @returns {byteArray}
     */
    bufferToByteArray: (buffer) => {
        return new Uint8Array(buffer);
    },
    /**
     * Convert byte to integer. Here 0X7F is the hex value of 127 and 0X100 is hex value of 256.
     * @param {byte} byte
     * @returns {number}
     */
    byteToInteger: (byte) => {
        // “& 0xff” effectively masks the variable so it leaves only the value
        // in the last 8 bits, and ignores all the rest of the bits.
        const ref = byte & 0xff;
        return (ref > 0x7F) ? ref - 0x100 : ref;
    },
    /**
     * Convert hex value to integer
     * @param {string} hex
     * @returns {number}
     */
    hexToInt: (hex) => {
        return parseInt(hex, 16);
    }
}
export default DecodeUtil;
