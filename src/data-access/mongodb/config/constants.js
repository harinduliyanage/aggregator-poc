/**
 * @file constants
 * @summary use to store static system data in one place
 */

/**
 * available token types
 * @type {{VERIFY_EMAIL: string, REFRESH: string, RESET_PASSWORD: string, ACCESS: string}}
 */
const tokenTypes = {
    ACCESS: 'ACCESS',
    REFRESH: 'REFRESH',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    RESET_PASSWORD: 'RESET_PASSWORD',
    VERIFY_EMAIL: 'VERIFY_EMAIL',
};

/**
 * available token status
 * @type {{PENDING: string, USED: string}}
 */
const tokenStatus = {
    PENDING: 'PENDING',
    USED: 'USED'
};

/**
 * available system roles
 * @type {string[]}
 */
const systemRoles = ['admin', 'super-admin', 'user', 'guest'];

const deviceReadingTypes = [
    'HEARTBEAT',
    'TAMPER',
    'ALARM',
    'LOW BATT',
    'TEMPERATURE',
    'HUMIDITY',
    'ZONE',
    'INOUT',
    'PERSENCE',
    'IN',
    'OUT',
    'ALERT',
    'POWERON',
    'ACCELEROMETER',
    'TXPOWER',
    'RSSI1M',
    'BATTERYPOWER',
    'RSSI0M',
    'INNUMBERACCUMULATED',
    'OUTNUMBERACCUMULATED',
    'VALUE'
];

/**
 * available device types
 * @type {string[]}
 */
const deviceTypes = ['BTBA', 'BTBG', 'BTB0', 'BTBZ', 'BTBM', 'BTBS', 'BTBK', 'BTBX'];

/**
 * available role types
 * @type {{SYSTEM: string, CUSTOM: string}}
 */
const roleTypes = {
    SYSTEM: "SYSTEM",
    CUSTOM: "CUSTOM",
}

/**
 * available alert priority
 * @type {string[]}
 */
const alertPriority = ['CRITICAL','HIGH', 'MEDIUM', 'LOW'];

/**
 * available alert status
 * @type {string[]}
 */
const alertStatus = ['NEW','TRIGGERED', 'RESOLVED', 'INACTIVE'];


/**
 * available contact methods
 * @type {string[]}
 */
 const contactMethods = ['EMAIL','SMS'];

export  {
    tokenTypes,
    tokenStatus,
    alertStatus,
    alertPriority,
    roleTypes,
    systemRoles,
    deviceTypes,
    deviceReadingTypes,
    contactMethods
}
