/**
 * @file Config file
 * @summary This file use to read the configuration in .env fil assign that configuration option to global config object,
 * we can access this config file using ("config.PROPERTY_NAME")
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../../.env') });
process.env.ROOT_PATH = path.join(__dirname, '../../../');

// configuration variable schema
const envVarsSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(3004),
        MQTT_HOST: Joi.string().required().description('Mqtt host address'),
        XK_SOCKET_URL: Joi.string().required().description('XK socket url'),
    }).unknown();

// schema validation
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`configuration validation error: ${error.message}`);
}

// export config object
export default {
    PORT: envVars.PORT,
    MQTT_HOST: envVars.MQTT_HOST,
    XK_SOCKET_URL: envVars.XK_SOCKET_URL,

}
