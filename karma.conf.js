// Karma configuration
// Generated on Mon Jul 31 2017 13:10:05 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha','chai'],
    files: [
      '*browsertest.js',
      'betterelement.js'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox', 'PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}
