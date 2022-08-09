import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
//
import toJSON from "./plugins/toJSON.plugin";
import paginate from "./plugins/paginate.plugin";

/** device model schema */
const deviceSchema = mongoose.Schema({
        isGateway: {
            type: Boolean,
            trim: true,
        },
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organizations',
            trim: true,
        },
        deviceModel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device Models',
            autopopulate: true
        },
        deviceName: {
            type: String,
            trim: true,
        },
        xkDeviceId: {
            type: String,
            trim: true,
        },
        macAddress: {
            type: String,
            required: true,
            trim: true,
        },
        supportedReadingTypes: {
            type: [{
                type: String
            }]
        },
    },
    {
        timestamps: true,
    }
)

// add plugin that converts mongoose to json
deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);
deviceSchema.plugin(mongooseAutoPopulate);

/** device model */
const Device = mongoose.model('Device', deviceSchema)

/** exporting the device model only for the usage within data access layer */
export default Device;
