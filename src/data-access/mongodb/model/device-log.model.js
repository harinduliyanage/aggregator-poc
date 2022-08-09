import * as mongoose from 'mongoose';
//
import toJSON from "./plugins/toJSON.plugin";
import paginate from "./plugins/paginate.plugin";
import {deviceReadingTypes} from "../config/constants";

/** device log model schema */
const deviceLogSchema = mongoose.Schema({
        deviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Devices',
            required: true,
            trim: true,
        },
        gatewayId: {
            type: String,
            trim: true,
        },
        deviceName: {
            type: String,
            trim: true,
        },
        readingType: {
            type: String,
            enum: deviceReadingTypes,
        },
        serviceSetIdentifier: {
            type: String,
            trim: true,
        },
        receivedSignalStrengthIdentifier: {
            type: String,
            trim: true,
        },
        reading: {
            type: String,
            trim: true,
        },
        unit: {
            type: String,
            trim: true,
        },
        rssi1m: {
            type: String,
            trim: true,
        },
        rssi0m: {
            type: String,
            trim: true,
        },
        rssi:{
            type: String,
            trim: true,
        },
        devicePath: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

// add plugin that converts mongoose to json
deviceLogSchema.plugin(toJSON);
deviceLogSchema.plugin(paginate);

/** device log model */
const DeviceLog = mongoose.model('Device Logs', deviceLogSchema)

/** exporting the device log model only for the usage within data access layer */
export default DeviceLog;
