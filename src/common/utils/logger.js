/**
 * @file - logger.js
 * @description - re-usable service for log management/filtering purposes
 * @type {
 * Readonly
 * <{
 * warn: logger.warn, trace: logger.trace, debug: logger.debug,
 * error: logger.error, info: logger.info, fatal: logger.fatal
 * }>}
 */

// todo: implement the filtering the logs base on int value
const logger = Object.freeze({
    /**
     * A log level describing events showing step by step execution of your code that can be ignored
     * during the standard operation, but may be useful during extended debugging sessions.
     * @param error
     */
    trace: (error) => {
        console.log(error)
    },
    /**
     * A log level used for events considered to be useful during software debugging when
     * more granular information is needed.
     * @param error
     */
    debug: (error) => {
        console.log(error)

    },
    /**
     * An event happened, the event is purely informative and can be ignored during normal operations.
     * @param msg
     */
    info: (msg) => {
        console.log(msg)
    },
    /**
     * Unexpected behavior happened inside the application, but it is continuing its work and the key business
     * features are operating as expected.
     * @param msg
     */
    warn: (msg) => {

    },
    /**
     * One or more functionalities are not working, preventing some functionalities from working correctly.
     * @param error
     */
    error: (error) => {
        console.log(error)

    },
    /**
     * One or more key business functionalities are not working and the whole system doesn’t
     * fulfill the business functionalities.
     * @param error
     */
    fatal: (error) => {
        console.log(error)

    }
});

export default logger;
