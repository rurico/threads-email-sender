
const { transport, mailOptions } = require('../config')
const { expose } = require('threads/worker')
const { createTestAccount, createTransport } = require('nodemailer')

expose({
    sendEmail(to) {
        return createTestAccount((err, account) => {
            const transporter = createTransport(transport)
            return transporter.sendMail(Object.assign(mailOptions, { to }))
        })
    }
})
