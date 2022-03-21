#!/bin/sh
npm run build
rm -rf ../../phone-back/build
cp -r build ../../phone-back