/**
 * Created by manhhailua on 1/10/17.
 */

/* eslint-disable no-console */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import { rootPath } from '../../config';

async function createCoreJsFolder() {
  const coreJsFolderName = 'corejs';
  const corePath = path.join(rootPath, `public/${coreJsFolderName}`);
  const builtCorePath = path.join(rootPath, `build/public/${coreJsFolderName}`);

  // Create {rootPath}/public/corejs folder if it is not existed
  if (!fs.existsSync(corePath)) {
    console.log(chalk.red(`No ${corePath} folder found! Create one...`));
    fs.mkdirSync(corePath, 0o755);
    console.log(chalk.green(`CREATED: ${corePath} folder. => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${corePath} is existed. => PASSED!`));
  }

  // Copy anyway
  await ncp.ncp(builtCorePath, corePath);
  console.log(chalk.green(`COPIED: ${corePath} to ${builtCorePath}. => PASSED!`));
}

async function startup() {
  console.log(chalk.grey.dim('START: startup functions.'));
  await createCoreJsFolder();
  console.log(chalk.magenta('DONE: startup jobs.'));
}

export default startup;
