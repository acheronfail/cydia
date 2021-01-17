import execa from 'execa';
import fs from 'fs-extra';
import gunzip from 'gunzip-maybe';
import path from 'path';
import stream from 'stream';
import tar from 'tar-fs';
import tempy from 'tempy';
import { promisify } from 'util';

import { fileChecksums } from './checksum';
import { REPO_ROOT } from './constants';
import { ControlKey } from './types';

const pipeline = promisify(stream.pipeline);
const removeFalsy = <T>(x?: T): x is T => Boolean(x);

function validateControl(filePath: string, controlLines: string[]) {
  const controlKeys = controlLines.map((line) => line.split(':')[0]);
  for (const key of Object.values(ControlKey)) {
    if (!controlKeys.includes(key)) {
      throw new Error(`Control key "${key}" not found in control file for ${filePath}!`);
    }
  }
}

export async function scanPackages(debPath: string): Promise<string[]> {
  const entries = await fs.readdir(debPath);
  const controls: string[] = (
    await Promise.all(
      entries.map(async (name) => {
        const filePath = path.join(debPath, name);
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) {
          return;
        }

        const tempPkgDir = tempy.directory();
        const tempPkg = path.join(tempPkgDir, name);
        const tempCtlTar = path.join(tempPkgDir, 'control.tar.gz');
        const tempCtl = path.join(tempPkgDir, 'control');

        await fs.copy(filePath, tempPkg);
        await execa('ar', ['-x', tempPkg], { cwd: tempPkgDir });
        await pipeline(fs.createReadStream(tempCtlTar), gunzip(), tar.extract(tempPkgDir));
        const checksums = await fileChecksums(filePath);
        const controlLines = (await fs.readFile(tempCtl, 'utf8'))
          .split(/\r?\n/)
          .filter(removeFalsy)
          .concat([
            `MD5sum: ${checksums.md5}`,
            `SHA1: ${checksums.sha1}`,
            `SHA256: ${checksums.sha256}`,
            `Size: ${stats.size}`,
            `Filename: ${path.relative(REPO_ROOT, filePath)}`,
          ])
          .sort();

        validateControl(filePath, controlLines);
        return controlLines.join('\n').trim();
      })
    )
  ).filter(removeFalsy);

  return controls;
}
