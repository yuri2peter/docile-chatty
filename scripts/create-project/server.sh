#!/bin/bash

# cd /your_project

# Get codes
curl -L https://github.com/yuri2peter/web-aircraft-carrier/archive/refs/heads/main.zip -o wac.zip

# Decompression
unzip wac.zip
mv -n web-aircraft-carrier-main/server/{.*,*} .
rm -rf web-aircraft-carrier-main
rm -rf wac.zip

# Initialize
sh init.sh

# Done