const ck = require('chalk');
const os = require('os');
const log = console.log;

const error = (msg, newline = false) => {
  log("💥  " + ck.bgRed.bold.white(`${msg}${newline ? os.EOL:''}`));
}
const progress = (msg, newline = false) => {
  log("⏳ " + ck.cyan.bold(`${msg}${newline ? os.EOL:''}`));
}
const info = (msg, newline = false) => {
  log(ck.yellow(`${msg}${newline ? os.EOL:''}`));
}
const success = (msg, newline = false) => {
  log("🎉 " +ck.green.bold(`${msg}${newline ? os.EOL:''}`));
}
const newLine = (count = 1) => {
  for (let c = 0; c < count; c++) {
    log();
  }
}

module.exports = {
  info,
  progress,
  error,
  success,
  newLine
}
