const { spawn, Thread, Worker } = require('threads')
const { receivers, completion, mySqlConnectionConfig } = require('./config')
const { writeCache, writeLogs } = require('./io')
const { connection } = require('./sql')
const { promisify } = require('util')
const querySync = promisify(connection.query);

(async () => {
    const emailSender = await spawn(new Worker('./workers/email-sender'))

    const receiverList = mySqlConnectionConfig instanceof Object ? (await querySync(mySqlConnectionConfig.querySQL)) : receivers

    for (const receiver of receiverList.filter(rcv => !completion.some(r => r === rcv))) {
        const { messageId } = await emailSender.sendEmail(receiver)
        messageId && (completion.push(receiver), writeCache(completion))
    }

    await Thread.terminate(emailSender)

    const failList = receivers.filter(rcv => completion.some(r => r === rcv))
    writeLogs(`失败队列: ${failList.join(',')}`)
})()