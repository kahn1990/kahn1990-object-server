var logger = require('./index.js');


logger("log4js/test_log4js.json");
console.log("log4js test start!");
logger.trace('This is a Log4js-Test');
logger.debug('We Write Logs with log4js');
logger.info('You can find logs-files in the log-dir');
logger.warn('log-dir is a configuration-item in the log4js.json');
logger.error('In This Test log-dir is : \'./logs/log_test/\'');

console.log("log4js test end!");