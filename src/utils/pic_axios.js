/**
 * @author IITII
 * @date 2020/9/7 15:41
 */
'use strict';
import axios from 'axios';

const service = axios.create({
  baseURL: "http://127.0.0.1/",
  timeout: 5000,
  timeoutErrorMessage: 'timeout',
  proxy: null,
});
// 接口数组
const INF = [
  'files',
];

async function getFiles() {
  return await new Promise((resolve, reject) => {
    service.post(INF[0])
      .then(response => {
        if (response === 1) {
          return resolve(response)
        } else {
          return reject(response)
        }
      })
      .catch(e => {
        console.log(e);
        return reject(e);
      })
  })
}

