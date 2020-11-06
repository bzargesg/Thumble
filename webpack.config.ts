const path = require("path");
import webpack, {Configuration} from "webpack";
const HtmlWebpackPlugin = require("html-webpack-plugin");
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const webpackConfig = (env): Configuration => ({
    entry: "./app/index.tsx",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /dist/
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/index.html"
        }),
        new webpack.DefinePlugin({
            PRODUCTION: "true",
            VERSION: "1",
            BROWSER_SUPPORTS_HTML5: true,
            "process.env.PRODUCTION": "true", //env.production || !env.development,
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version)
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./app/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx
            }
        })
    ]
});

export default webpackConfig;
