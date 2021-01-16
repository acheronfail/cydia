import { scanPackages } from './scan-packages';
import { Bzip2 } from 'compressjs';
import fs from 'fs-extra';
import { DEBS_DIR, REPO_PKGS } from './constants';

async function main() {
  // create Packages.bz2
  const controls = await scanPackages(DEBS_DIR);
  const control = controls.join('\n\n');
  await fs.writeFile(REPO_PKGS, Bzip2.compressFile(Buffer.from(control)));
}

if (require.main === module) {
  main().then(undefined, (err) => {
    console.error(err);
    process.exit(1);
  });
}
