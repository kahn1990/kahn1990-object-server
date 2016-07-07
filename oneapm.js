/**
 * OneAPM agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['kahn1990-object-server'],
  /**
   * Your OneAPM license key.
   */
  license_key : 'BAFRVgIBDwR33dfQHF1FWVQUW02973ZfCEoACQYGSf030wAKHQQIFAcC5885AlFLAgEaAlE=',
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to OneAPM when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'info'
  },
  transaction_events: {
        enabled: true
  }
};
