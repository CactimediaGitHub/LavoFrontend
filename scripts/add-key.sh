#!/bin/sh

security create-keychain -p $KEYCHAIN_PASSWORD ios-build.keychain
security import ./certs/ios_distribution.cer -k ~/Library/Keychains/ios-build.keychain -T /usr/bin/codesign
security import ./certs/ios_distribution.p12 -k ~/Library/Keychains/ios-build.keychain -P $KEY_PASSWORD -T /usr/bin/codesign
security list-keychain -s ~/Library/Keychains/ios-build.keychain
security unlock-keychain -p $KEYCHAIN_PASSWORD ~/Library/Keychains/ios-build.keychain

mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
cp ./scripts/profiles/* ~/Library/MobileDevice/Provisioning\ Profiles/
