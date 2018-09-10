const path = require("path");

module.exports = {
    "mode": "development",
    "entry": "./src/test/main.tsx",
    "devtool": "inline-source-map",
    "output": {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "src": path.resolve(__dirname, "src")
        }
    },
    "module": {
        "rules": [
            {
                "test": /\.tsx?$/,
                "loader": "ts-loader"
            }
        ]
    }
}