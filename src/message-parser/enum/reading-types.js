/**
 * @file Reading types
 * @summary Define the message parser support all the reading types
 */
const ReadingTypes = Object.freeze({
    TEMPERATURE: 'TEMPERATURE',
    HUMIDITY: 'HUMIDITY',
    TAMPER: 'TAMPER',
    ALARM: 'ALARM',
    LOW_BAT: 'LOW BATT',
    HEARTBEAT: 'HEARTBEAT'
});
export default ReadingTypes;
