const fs = require('fs');

const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

function reqLog(req, { statusCode }, next) {
  const level = statusCode < 400 ? 'Info' : 'Error';
  doLog(`${req.method}:${req.url} ${statusCode}`, level);
  next();
};

function doLog(log, level = 'Debug') {
  if (typeof log !== 'string') log = JSON.stringify(log);
  log = `[${level}] ${getTime()} - ${log}`;
  console.log(log);
  
  const logDate = new Date().toISOString('en-US').replace(/T.*/, '').split('-').reverse().join('-');
  fs.appendFileSync(`./logs/backend_${logDate}.log`, log + '\n');
}

function getTime() {
  let now = new Date();
  return now.toUTCString();
}

module.exports = {
  reqLog,
  debug(log) {
    doLog(log, 'Debug')
  },
  info(log) {
    doLog(log, 'Info')
  },
  warn(log) {
    doLog(log, 'Warn')
  },
  error(log) {
    doLog(log, 'Error')
  }
}
