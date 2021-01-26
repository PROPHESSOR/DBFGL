#!/bin/bash

# Этот скрипт нужно выполнять после yarn build.
# Он подготовит папку build для упаковки Electron Builder

cp app.js build/
cp package-app.json build/package.json
cp src/theme/assets/icon.ico build/

# Патч для совместимости с wadcover'ами TODO: Решить на уровне приложения
mkdir build/public
mv build/assets build/public/