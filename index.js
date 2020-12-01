#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');

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

program.parse(process.argv);