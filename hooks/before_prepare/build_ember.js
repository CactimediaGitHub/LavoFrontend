#!/usr/bin/env node
var exec = require('child_process').execSync;

var fs = require('fs'),
    path = require('path');

var cliCommand = process.env.CORDOVA_CMDLINE;

var environment = 'development';
if (cliCommand.indexOf('android') > -1) {
  environment = 'cordova-development-android';
} else if (cliCommand.indexOf('ios') > -1) {
  environment = 'cordova-development-ios';
}
if (cliCommand.indexOf('--staging') > -1) {
  environment = 'staging';
} else if (cliCommand.indexOf('--production') > -1) {
  environment = 'production';
}else if(cliCommand.indexOf('--lits-staging')> -1){
  environment = 'lits-staging';
}

console.log('Build Ember for environment: ' + environment);
try {
  exec('cd src && ember build --environment=' + environment + ' --output-path ' + __dirname + '/../../www');
}
catch (e) {
  console.error('\nEmber build error:\n');
  for (var i = 0; i < e.output.length; i++) {
    if (e.output[i] !== null && (typeof e.output[i].toString) == 'function') {
      console.error(e.output[i].toString());
    } else {
      console.error(e.output[i]);
    }
  }
  console.error('\n==========================\n');
  throw e;
}
