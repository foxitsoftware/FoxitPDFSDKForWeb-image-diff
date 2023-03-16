const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
    override,
    addWebpackPlugin,
    addWebpackExternals,
    removeModuleScopePlugin
} = require('customize-cra');
const path = require("path");
const fs = require('fs');

const libPath = path.resolve(__dirname, './node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library-full/lib');
const fontPath = path.resolve(__dirname, '../../../external');

module.exports = override(
    removeModuleScopePlugin(),
    addWebpackPlugin(
        new CopyWebpackPlugin({
            patterns: [{
                from: libPath,
                to: 'foxit-lib',
                force: true
            }].concat( fs.existsSync(fontPath) ? {
                from: fontPath,
                to: 'external',
                force: true
            } : [])
        })
    ),
    addWebpackExternals(
        {
            PDFViewCtrl: '@foxitsoftware/foxit-pdf-sdk-for-web-library-full/lib/PDFViewCtrl.full.js'
        }
    )
)