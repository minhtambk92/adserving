/**
 * Created by manhhailua on 1/10/17.
 */

import { copyDir } from './lib/fs';

/**
 * Backup {rootPath}/build/public/corejs folder
 */
function backup() {
  const builtCorePath = 'build/public/corejs';
  const corePath = 'public/corejs';

  return Promise.all([
    copyDir(builtCorePath, corePath),
  ]);
}

export default backup;
