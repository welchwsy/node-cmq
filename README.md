# node-cmq
腾讯云消息队列的nodejs JDK

API文档 [https://www.qcloud.com/doc/api/431/5832](https://www.qcloud.com/doc/api/431/5832)

## 队列操作接口

* CreateQueue(queueName, maxMsgHeapNum, pollingWaitSeconds, visibilityTimeout, maxMsgSize, msgRetentionSeconds, next(err, data) {})
* ListQueue (searchWord, offset, limit, next(err, data) {})
* GetQueueAttributes (queueName, next(err, data) {})
* SetQueueAttributes (queueName, maxMsgHeapNum, pollingWaitSeconds, visibilityTimeout, maxMsgSize, msgRetentionSeconds, next(err, data) {})
* DeleteQueue (queueName, next (err, data) {})

## 消息操作

* SendMessage (queueName, msgBody, next(err, data) {})
* BatchSendMessage (queueName, msgBodys, next(err, data) {})
* ReceiveMessage (queueName, pollingWaitSeconds, next(err, data) {})
* BatchReceiveMessage (queueName, numOfMsg, pollingWaitSeconds, next(err, data) {})
* DeleteMessage (queueName, receiptHandle, next(err, data) {})
* BatchDeleteMessage (queueName, receiptHandles, next(err, data) {})

## Example

```javascript
// 创建cmq对象，`http://cmq-queue-gz.api.qcloud.com`需要根据你的服务器自行填写，参考： https://www.qcloud.com/doc/api/431/5832
const cmq = new CMQ('your SecretId', 'your SecretKey', 'http://cmq-queue-gz.api.qcloud.com')
cmq.CreateQueue('yourQueueName', (err,data) => {
  console.log('CreateQueue', err, data)
})
```
