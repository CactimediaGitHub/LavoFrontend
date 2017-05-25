#!/bin/sh

# Clear folders
rm -rf platforms/*
rm -rf plugins/*
rm -rf www && mkdir www

# Install npm and bower dependencies
(cd src && npm i && bower i)

# Add platforms
cordova platform add ios
cordova platform add android

# Add plugins
cordova plugin add cordova-plugin-crosswalk-webview
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-geolocation@2.4.0
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="157554801446948" --variable APP_NAME="Lavo"
cordova plugin add cordova-plugin-datepicker
cordova plugin add cordova-plugin-firebase@0.1.20 --save
cordova plugin add ionic-plugin-keyboard
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-dialogs


cp ios_res/Lavo.entitlements platforms/ios/Lavo/Lavo.entitlements