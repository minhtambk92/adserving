/**
 * Created by manhhailua on 1/10/17.
 */

/* eslint-disable no-console */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { copyDir } from '../../../tools/lib/fs';
import { rootPath, host } from '../../config';

async function createCoreJsFolder() {
  const coreJsFolderName = 'corejs';
  const corePath = path.join(rootPath, `public/${coreJsFolderName}`);
  const builtCorePath = path.join(rootPath, `build/public/${coreJsFolderName}`);

  // Create {rootPath}/public/corejs folder if it is not existed
  if (!fs.existsSync(corePath)) {
    fs.mkdirSync(corePath, 0o755);
  }

  // Copy anyway
  await copyDir(corePath, builtCorePath);
}

async function startup() {
  console.log(chalk.grey.dim('START: startup functions.'));
  await createCoreJsFolder();
  console.log(chalk.magenta(`Your app is now ready at http://${host}`));
}

export default startup;
