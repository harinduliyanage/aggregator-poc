const mongoose = require('../config/mongoose');
const {Schema} = mongoose;

/** Device model schema */
const DeviceSchema = new Schema(
    {
        sample: String,
    },
    {timestamps: true}
)

/** Device Model */
const Device = mongoose.model('Device', DeviceSchema)

/** Exporting the device model only for the usage within data access layer */
module.exports = Device