const webpack = require('webpack');
const path = require('path');

module.exports = env => {
    return {
        watch: true,
        entry: ['./static-assets/src/index.js'],
        output: {
            filename: 'device-stats.js',
            path: path.resolve(__dirname, 'static-assets/')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']
                            }
                        }
                    ]
                }
            ]
        }
    };
};
