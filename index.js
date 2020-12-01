#!/usr/bin/env node
const { program } = require('commander');
const npmFetch = require('npm-registry-fetch')
const { log } = require("./helpers");

const basicCheck = require('./types/basic');

const VERSION = require('./package.json').version;

program.version(VERSION);
program
  .command(`basic`, { isDefault: true })
  .description(`Run basic check for a list of urls checking for status code [2xx] or [3xx]`)
  .option(`-G, --group <group>`, `specify the group to run, the group name should match the file name containing urls. Or use "all" to run tests on all groups`, `example`)
  .action((cmdObj) => {
      basicCheck(cmdObj.group);
  })

// Check if there is any newer version
const res = npmFetch.json('/@jinzheli/hawkeye', { timeout: 3000 })
res.then(json => {
  let latestVersion = json['dist-tags'].latest;
  if (VERSION != latestVersion) {
    log.info(`----------------------------------------------------------`)
    log.info(`There is a newer version available - ${latestVersion}.`);
    log.info(`Update by running`)
    log.info(`npm i -g @jinzheli/hawkeye@latest`);
    log.info(`----------------------------------------------------------`, true)
  }
}).finally(()=>{
  program.parse(process.argv);
})