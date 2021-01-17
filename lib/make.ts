import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

import { SRC_DIR } from './constants';
import { runAsyncMain } from './util';

async function main() {
  for (const entry of await fs.readdir(SRC_DIR)) {
    const fullPath = path.join(SRC_DIR, entry);
    const stat = await fs.stat(fullPath);
    if (!stat.isDirectory()) {
      continue;
    }

    const makeFilePath = path.join(fullPath, 'Makefile');
    if (!(await fs.pathExists(makeFilePath))) {
      continue;
    }

    await execa('make', ['package', 'FOR_RELEASE=1'], { cwd: fullPath, stdio: 'inherit' });
  }
}

if (require.main === module) {
  runAsyncMain(main);
}
