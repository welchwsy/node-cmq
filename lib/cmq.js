const crypto = require('crypto')
const request = require('request')

class CMQ {
  constructor (secretId, secretKey, endpoint = 'http://cmq-queue-gz.api.qcloud.com', debug = true) {
    this.endpoint = endpoint
    this.host = endpoint.substr((endpoint.indexOf('://') + 3))
    this.secretId = secretId
    this.secretKey = secretKey
    this.debug = debug
  }
  /**
   * 生成签名
   * @param {String} str 需签名的参数串
   * @param {String} secretKey
   * @returns {String} 签名
   */
  sign (str) {
    var hmac = crypto.createHmac('sha1', this.secretKey || '')
    return hmac.update(new Buffer(str, 'utf8')).digest('base64')
  }
  /**
   * 创建队列
   * @param {string} queueName 队列名称
   * @param {init} maxMsgHeapNum
   * @more https://www.qcloud.com/doc/api/431/5832
   */
  CreateQueue (queueName, maxMsgHeapNum = 10000000, pollingWaitSeconds = 0, visibilityTimeout = 30, maxMsgSize = 65536, msgRetentionSeconds = 345600) {
    let signStr = sign(`POST${this.host}?Action=CreateQueue&queueName=${queueName}`)
    console.log('signStr', signStr)
  }
}



module.exports = CMQ

