const cmqClient = require('qcloudapi-sdk')
const version = require('../package.json').version
class CMQ {
  constructor (secretId, secretKey, endpoint = 'http://cmq-queue-gz.api.qcloud.com', debug = false) {
    this.cmq_client = new cmqClient({
      SecretId: secretId,
      SecretKey: secretKey,
      serviceType: 'cmq-queue-' + endpoint.substr(endpoint.indexOf('.') - 2, 2),
      Region: endpoint.substr(endpoint.indexOf('.') - 2, 2),
      RequestClient: 'cmq-' + version
    })
  }

  /**
   * 创建队列
   * @param {string} queueName 队列名称
   * @param {init} maxMsgHeapNum
   * @more https://www.qcloud.com/doc/api/431/5832
   */
  CreateQueue (queueName, maxMsgHeapNum = 10000000, pollingWaitSeconds = 0, visibilityTimeout = 30, maxMsgSize = 65536, msgRetentionSeconds = 345600, next = function () {}) {
    if (typeof maxMsgHeapNum === 'function') {
      next = maxMsgHeapNum
      maxMsgHeapNum = 10000000
    }
    this.cmq_client.request({
        Action: 'CreateQueue',
        queueName: queueName,
        maxMsgHeapNum: maxMsgHeapNum,
        pollingWaitSeconds: pollingWaitSeconds,
        visibilityTimeout: visibilityTimeout,
        maxMsgSize: maxMsgSize,
        msgRetentionSeconds: msgRetentionSeconds
    }, function(error, data) {
        next(error, data)
    })
  }

  ListQueue (searchWord, offset = 0, limit = 20, next = function () {}) {
    if (typeof offset === 'function') {
      next = offset
      offset = 0
    }
    this.cmq_client.request({
        Action: 'ListQueue',
        searchWord: searchWord,
        offset: offset,
        limit: limit
    }, function(error, data) {
        next(error, data)
    })
  }

  GetQueueAttributes (queueName, next = function () {}) {
    this.cmq_client.request({
        Action: 'GetQueueAttributes',
        queueName: queueName
    }, function(error, data) {
        next(error, data)
    })
  }

  SetQueueAttributes (queueName, maxMsgHeapNum = 10000000, pollingWaitSeconds = 0, visibilityTimeout = 30, maxMsgSize = 65536, msgRetentionSeconds = 345600, next = function () {}) {
    if (typeof maxMsgHeapNum === 'function') {
      next = maxMsgHeapNum
      maxMsgHeapNum = 10000000
    }
    this.cmq_client.request({
        Action: 'SetQueueAttributes',
        queueName: queueName,
        maxMsgHeapNum: maxMsgHeapNum,
        pollingWaitSeconds: pollingWaitSeconds,
        visibilityTimeout: visibilityTimeout,
        maxMsgSize: maxMsgSize,
        msgRetentionSeconds: msgRetentionSeconds
    }, function(error, data) {
        next(error, data)
    })
  }

  DeleteQueue (queueName, next = function () {}) {
    this.cmq_client.request({
        Action: 'DeleteQueue',
        queueName: queueName
    }, function(error, data) {
        next(error, data)
    })
  }

  SendMessage (queueName, msgBody, next = function() {}) {
    this.cmq_client.request({
        Action: 'SendMessage',
        queueName: queueName,
        msgBody: msgBody
    }, function(error, data) {
        next(error, data)
    })
  }

  BatchSendMessage (queueName, msgBodys, next = function() {}) {
    let qBody = {
        Action: 'BatchSendMessage',
        queueName: queueName,
    }
    for (let i in msgBodys) {
      qBody[`msgBody.${i}`] = msgBodys[i]
    }
    this.cmq_client.request(qBody, function(error, data) {
        next(error, data)
    })
  }

  ReceiveMessage (queueName, pollingWaitSeconds = 0, next = function () {}) {
    this.cmq_client.request({
        Action: 'ReceiveMessage',
        queueName: queueName,
        pollingWaitSeconds: pollingWaitSeconds
    }, function(error, data) {
        next(error, data)
    })
  }

  BatchReceiveMessage (queueName, numOfMsg, pollingWaitSeconds, next = function () {}) {
    this.cmq_client.request({
        Action: 'BatchReceiveMessage',
        queueName: queueName,
        numOfMsg: numOfMsg,
        pollingWaitSeconds: pollingWaitSeconds
    }, function(error, data) {
        next(error, data)
    })
  }

  DeleteMessage (queueName, receiptHandle, next = function() {}) {
    this.cmq_client.request({
        Action: 'DeleteMessage',
        queueName: queueName,
        receiptHandle: receiptHandle
    }, function(error, data) {
        next(error, data)
    })
  }

  BatchDeleteMessage (queueName, receiptHandles, next = function() {}) {
    let qBody = {
        Action: 'BatchDeleteMessage',
        queueName: queueName
    }
    for (let i in receiptHandles) {
        qBody[`receiptHandle.${i}`] = receiptHandles[i]
    }
    this.cmq_client.request(qBody, function(error, data) {
        next(error, data)
    })
  }
}

module.exports = CMQ

