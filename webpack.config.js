const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'main', 'ts', 'index.tsx'),
    target: 'web',
    mode: 'development',
    watchOptions: {
        poll: true
    },
    devServer: {
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
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
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