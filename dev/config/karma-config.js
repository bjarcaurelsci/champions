import webpackConfig from './webpack-config';

export default {
    singleRun: true,
    browsers: [ 'PhantomJS' ],

    // karma only needs to know about the test bundle
    files: [
        './node_modules/babel-polyfill/dist/polyfill.js',
        './test/**/*.js*',
    ],
    frameworks: [ 'chai', 'mocha' ],

    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
        './test/**/*.js*': [ 'webpack', 'sourcemap' ],
    },
    reporters: [ 'dots' ],

    // webpack config object
    webpack: {
        ...webpackConfig,
        devtool: 'inline-source-map',
    },
    webpackMiddleware: {
        noInfo: true,
    },

    plugins: [
        'karma-phantomjs-launcher',
        'karma-chai',
        'karma-mocha',
        'karma-sourcemap-loader',
        'karma-webpack',
    ],
};
