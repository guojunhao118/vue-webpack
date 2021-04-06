const os = require('os')

const log = console.log.bind(console)

/**
 * 获取本机IP
 */
const deviceIp = (() => {
    let obj = os.networkInterfaces()
    for (let devName in obj) {
        let iface = obj[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
})()

module.exports = {
    deviceIp
}