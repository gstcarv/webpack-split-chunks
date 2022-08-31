const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "chunks/[name].chunk.js",
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: 3031,
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            inject: "body",
        }),

        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),

        new BundleAnalyzerPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },

    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        return `packages/npm.${packageName.replace("@", "")}`;
                    },
                },
            },
        },
    },
};
