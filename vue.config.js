/**
 * @author IITII
 * @date 2020/9/9 12:55
 */
'use strict';
const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.PIC_DEPLOY_FIR || '/waterfall/'
    : '/',
  outputDir: path.resolve(
    process.env.PIC_OUTPUT_DIR || './dist'
  ),
  productionSourceMap: process.env.PIC_SOURCE_MAP || false,
}