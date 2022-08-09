/**
 * @file device-model model
 * @summary Mongoose schema for device model domain
 */
import mongoose from 'mongoose';
import toJSON from "./plugins/toJSON.plugin";
import paginate from "./plugins/paginate.plugin";

const deviceModelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        make: {
            type: String,
            required: true,
            trim: true,
        },
        model: {
            type: String,
            required: true,
            trim: true,
        },
        deviceTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device Types',
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

deviceModelSchema.statics.isModelTaken = async function (model, excludeId) {
    const deviceModel = await this.findOne({ model, _id: { $ne: excludeId } });
    return !!deviceModel;
};

// add plugin that converts mongoose to json
deviceModelSchema.plugin(toJSON);
deviceModelSchema.plugin(paginate);


const DeviceModel = mongoose.model('Device Models', deviceModelSchema);

export default DeviceModel;
