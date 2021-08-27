const { spawn, Thread, Worker } = require('threads')
const { receivers, completion } = require('./config')
const { writeCache, writeLogs } = require('./io')

~(async () => {
    const emailSender = await spawn(new Worker("./workers/email-sender"))

    for (const receiver of receivers.filter(rcv => !completion.some(r => r === rcv))) {
        const result = await emailSender.sendEmail(receiver)
        result && result.messageId && (completion.push(receiver)) && writeCache(completion)
    }

    await Thread.terminate(emailSender)

    const failList = receivers.filter(rcv => completion.some(r => r === rcv))
    writeLogs(`失败队列: ${failList.join(',')}`)
})()