/**
 * Created by manhhailua on 1/10/17.
 */

import path from 'path';
import { copyDir } from './lib/fs';

/**
 * Backup {rootPath}/build/public/corejs folder
 */
function backup() {
  const builtPath = 'build/public';
  const sourcePath = 'public';

  const builtCoreJsPath = path.join(builtPath, 'corejs');
  const coreJsPath = path.join(sourcePath, 'corejs');
  const builtUploadsPath = path.join(builtPath, 'uploads');
  const uploadsPath = path.join(sourcePath, 'uploads');

  return Promise.all([
    copyDir(builtCoreJsPath, coreJsPath),
    copyDir(builtUploadsPath, uploadsPath),
  ]);
}

export default backup;
