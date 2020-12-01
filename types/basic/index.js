const pptr = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { log } = require.main.require('./helpers');

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

const basicCheck = (group) => {
  let workingDir = path.resolve('.', 'basic');
  fs.readdir(workingDir, async (err, files) => {
    // Configuration folder is not accessible
    if (err) {
      log.error(`Cannot access folder [${workingDir}] which contains the urls configurations.`);
      return;
    }

    let urls = [];
    let urlFiles = [];
    if (group == 'all') {
      urlFiles = files.filter(f => f != 'index.js').map(group => path.resolve(workingDir, group));
      log.progress(`Running basic check for all groups`);
      log.info(`The configuration ulrs groups are loaded from:`);
      urlFiles.forEach(f => {
        log.info(`${f}`);
      })
      log.info(`----------------------------`);
      log.info(`${urlFiles.length} in total`,true);
    } else {
      let groups = files.filter(f => f != 'index.js');
      if (!groups.find(g => g == group)) {
        log.error(`Group configuration cannot be found with ${workingDir}`);
        return
      }
      const urlsConfig = path.resolve(workingDir, group);
      urlFiles = [urlsConfig];
      log.progress(`Running basic check for group - ${group}`);
      log.info(`The configuration ulrs are loaded from [${urlsConfig}]`, true);
    }
    log.progress(`Loading urls...`)
    for (let urlsConfig of urlFiles) {
      let content = fs.readFileSync(urlsConfig, 'utf8');
      urls = urls.concat(content.split(os.EOL).filter(isValidUrl));
    }
    log.success(`${urls.length} urls loaded`, true);

    log.progress(`Launch puppeteer to check pages...`);
    let failedUrls = [];
    await (async () => {
      const browser = await pptr.launch();
      const page = await browser.newPage();
      for (let url of urls) {
        const resp = await page.goto(url)
        if (!resp.status().toString().match(/^[23]/)) {
          failedUrls.push(url);
          log.info(`👎 ${url} - Failed`);
        } else {
          log.info(`👍 ${url} - OK`);
        }
      }
      await browser.close();
    })();
    log.success(`Basic check done.`, true)

    log.info(`------------------------------------------------`);
    log.progress("Summary:");
    log.info(`OK - ${urls.length - failedUrls.length}`);
    log.info(`Failed - ${failedUrls.length}`, true);
    if (failedUrls.length) {
    log.progress("Here are the failed urls:");
      for (let url of failedUrls) {
        log.info(url);
      }
    }
  })
};

module.exports = basicCheck;