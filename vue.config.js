/**
 * @author IITII
 * @date 2020/9/9 12:55
 */
'use strict';
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pic/'
    : '/'
}