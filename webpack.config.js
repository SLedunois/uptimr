const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'main', 'ts', 'index.tsx'),
    target: 'web',
    mode: 'development',
    devtool: 'inline-source-map',
    watchOptions: {
        poll: true
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8090,
        contentBase: path.resolve(__dirname, 'src', 'main', 'resources', 'templates'),
        publicPath: '/dist',
        hot: true,
        overlay: true,
        watchOptions: {
            poll: 300
        },
        proxy: {
            '/**': {  //catch all requests
                target: '/index.html',  //default target
                secure: false,
                bypass: function (req, res, opt) {
                    //your custom code to check for any exceptions
                    //console.log('bypass check', {req: req, res:res, opt: opt});
                    if (req.path.indexOf('/incidents') !== -1 || req.path.indexOf('/heartbeats') !== -1) {
                        return '/'
                    }

                    if (req.headers.accept.indexOf('html') !== -1) {
                        return '/index.html';
                    }
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'target')],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    'postcss-loader'
                ]
            },
            {
                loader: require.resolve('file-loader'),
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.css$/],
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                }
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@images': path.resolve(__dirname, 'src/main/resources/META-INF/resources/images'),
            '@locales': path.resolve(__dirname, 'src/main/resources/locales'),
            '@components': path.resolve(__dirname, 'src/main/ts/components'),
            '@app': path.resolve(__dirname, 'src/main/ts')
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src', 'main', 'resources', 'META-INF', 'resources', 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'main', 'resources', 'index.html'),
            filename: path.resolve(__dirname, 'src', 'main', 'resources', 'templates', 'index.html'),
            publicPath: '/dist'
        })
    ],
};