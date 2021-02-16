# DEVELOPING

Directory structure:

* `debs/`: packaged `.deb` files, these are the ones user's will download from Cydia
* `src/`: the source files for each of the packages in the `debs` folder
* `lib/`: scripts for managing this repository, the `package.json` file is for this folder
* `Release`: Repository release file: https://wiki.debian.org/DebianRepository/Format#A.22Release.22_files
* `Packages.bz2`: https://wiki.debian.org/DebianRepository/Format#A.22Packages.22_Indices

## Tips

Common functions/commands are listed in the `justfile`. See [just] for how to use this.

## `src`

Mostly tweaks, some useful references:

* https://iphonedevwiki.net/index.php/Logos
* http://iphonedevwiki.net/index.php/Cydia_Substrate
* https://iphonedevwiki.net/index.php/Reverse_Engineering_Tools#class-dump.2C_class_dump_z.2C_classdump-dyld
* http://developer.limneos.net/
* https://github.com/theos/theos
* https://stackoverflow.com/a/11553722/5552584
* https://www.theiphonewiki.com/

## `lib`

This is a TypeScript project, so install NodeJS if you haven't already.
It also uses `yarn` as the package manager.

```bash
# As a first step (only need to run this once) install dependencies:
yarn

# Then, to update the repository this command will read all the packages in `debs`
# and will update the `Packages.bz2` file accordingly:
yarn update
```

## Other Useful Links

* https://github.com/hbang/libcephei
* https://github.com/rpetrich/libactivator
* https://github.com/LacertosusRepo/Open-Source-Tweaks
* https://github.com/andrewwiik/Tweaks

[just]: https://github.com/casey/just
