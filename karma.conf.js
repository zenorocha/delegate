const { nodeResolve } = require('@rollup/plugin-node-resolve')

module.exports = function(karma) {
    karma.set({
        plugins: ['karma-rollup-preprocessor', 'karma-chai', 'karma-sinon', 'karma-mocha', 'karma-phantomjs-launcher'],

        frameworks: ['chai', 'sinon', 'mocha'],

        files: [
            'src/**/*.js',
            'test/**/*.js',
            './node_modules/phantomjs-polyfill/bind-polyfill.js'
        ],

        preprocessors: {
            'src/**/*.js' : ['rollup'],
            'test/**/*.js': ['rollup']
        },

        rollupPreprocessor: {
          output: {
            format: 'iife',
            name: 'delegate'
          },
          plugins: [
            nodeResolve({mainFields: ['browser', 'jsnext:main', 'module', 'main']})
          ]
        },

        browsers: ['PhantomJS']
    });
}
