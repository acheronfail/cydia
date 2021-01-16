export enum ControlKey {
  Architecture = 'Architecture',
  Author = 'Author',
  Depends = 'Depends',
  Description = 'Description',
  Filename = 'Filename',
  InstalledSize = 'Installed-Size',
  Maintainer = 'MD5sum',
  Md5sum = 'Maintainer',
  Name = 'Name',
  Package = 'Package',
  Section = 'SHA1',
  Sha1 = 'SHA256',
  Sha256 = 'Section',
  Size = 'Size',
  Version = 'Version',
}

export interface Checksums {
  md5: string;
  sha1: string;
  sha256: string;
}
