import crypto from 'crypto';
import fs from 'fs-extra';

import { Checksums } from './types';

export function fileChecksums(filePath: string): Promise<Checksums> {
  const data = fs.createReadStream(filePath);
  const hashes = [crypto.createHash('md5'), crypto.createHash('sha1'), crypto.createHash('sha256')];

  for (const hash of hashes) {
    hash.setEncoding('hex');
    data.pipe(hash);
  }

  return new Promise((resolve) => {
    data.on('end', () => {
      const [md5, sha1, sha256] = hashes.map((hash) => (hash.end(), hash.read()));
      resolve({ md5, sha1, sha256 });
    });
  });
}
