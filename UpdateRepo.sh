#!/bin/bash

rm Packages*
find ./src -iname '*.deb' -exec mv {} ./debs/ \;
./dpkg-scanpackages -m . /dev/null >Packages
bzip2 Packages

