#!/bin/bash

RELEASE_DATE=`date '+%Y-%m-%d %H:%M:%S'`

RELEASE_NOTES="Version: $APP_VERSION
Build: $CIRCLE_BUILD_NUM
Branch: $CIRCLE_BRANCH
Commit: $CIRCLE_SHA1
Uploaded: $RELEASE_DATE"

UT_TOKEN=$UT_DEV_TOKEN

BUILD_PATH_IOS="$PWD/platforms/ios/build/device/Lavo.ipa"
BUILD_PATH_ANDROID="$PWD/platforms/android/build/outputs/apk/android-armv7-debug.apk"
BUILD_PATH_ANDROID_TMP="$PWD/platforms/android/build/outputs/apk/android-armv7-debug.apk"

if [ "$CIRCLE_BRANCH" = "stable" ]; then
    UT_TOKEN=$UT_RC_TOKEN
fi

if [ -f $BUILD_PATH_IOS ]; then
  echo "* Upload iOS build to ubertesters"
  curl \
  --connect-timeout 300 --max-time 900 \
  -X POST http://50.18.63.173/api/client/upload_build.json \
  -H "X-UbertestersApiKey:$UT_TOKEN" \
  -F "file=@$BUILD_PATH_IOS" \
  -F "title=$CIRCLE_BRANCH" \
  -F "notes=$RELEASE_NOTES" \
  -F "status=in_progress" \
  -F "stop_previous=true" -v
fi

if [ -f $BUILD_PATH_ANDROID_TMP ]; then
  echo "* Upload android build to ubertesters"
  mv $BUILD_PATH_ANDROID_TMP $BUILD_PATH_ANDROID
  curl \
  --connect-timeout 300 --max-time 900 \
  -X POST http://50.18.63.173/api/client/upload_build.json \
  -H "X-UbertestersApiKey:$UT_TOKEN" \
  -F "file=@$BUILD_PATH_ANDROID" \
  -F "title=$CIRCLE_BRANCH" \
  -F "notes=$RELEASE_NOTES" \
  -F "status=in_progress" \
  -F "stop_previous=true" -v
fi
