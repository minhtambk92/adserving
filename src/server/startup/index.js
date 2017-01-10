/**
 * Created by manhhailua on 1/10/17.
 */

/* eslint-disable no-console */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import { rootPath } from '../../config';

/**
 * Create sourcePath if is not existed then copy to destinationPath
 * @param sourcePath
 * @param destinationPath
 * @returns {Promise.<void>}
 */
async function createAndCopyFolder(sourcePath, destinationPath) {
  // Create {rootPath}/public/{sourcePath} folder if it is not existed
  if (!fs.existsSync(sourcePath)) {
    console.log(chalk.red(`No ${sourcePath} folder found! Create one...`));
    fs.mkdirSync(sourcePath, 0o755);
    console.log(chalk.green(`CREATED: ${sourcePath} folder. => PASSED!`));
  } else {
    console.log(chalk.green(`FOUND: ${sourcePath} is existed. => PASSED!`));
  }

  // Copy anyway from {sourcePath} to {destinationPath}
  await ncp.ncp(sourcePath, destinationPath);
  console.log(chalk.green(`COPIED: ${sourcePath} to ${destinationPath}. => PASSED!`));
}

/**
 * Uploads folder
 * @returns {Promise.<void>}
 */
async function createUploadsFolder() {
  const uploadsFolderName = 'uploads';
  const uploadsPath = path.join(rootPath, `public/${uploadsFolderName}`);
  const builtUploadsPath = path.join(rootPath, `build/public/${uploadsFolderName}`);

  await createAndCopyFolder(uploadsPath, builtUploadsPath);
}

/**
 * Corejs folder
 * @returns {Promise.<void>}
 */
async function createCoreJsFolder() {
  const coreJsFolderName = 'corejs';
  const corePath = path.join(rootPath, `public/${coreJsFolderName}`);
  const builtCorePath = path.join(rootPath, `build/public/${coreJsFolderName}`);

  await createAndCopyFolder(corePath, builtCorePath);
}

/**
 * Synchronized startup jobs
 * @returns {Promise.<void>}
 */
async function startup() {
  console.log(chalk.grey.dim('START: startup jobs.'));
  await createCoreJsFolder();
  await createUploadsFolder();
  console.log(chalk.magenta('DONE: startup jobs.'));
}

export default startup;
