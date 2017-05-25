/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'lavo-mobile',
    podModulePrefix: 'lavo-mobile/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    moment: {
      outputFormat: 'YYYY-MM-DD HH:mm:ss +0000'
    },

    MAPBOX: {
      accessToken: 'pk.eyJ1IjoiY2FjdGltYXBib3giLCJhIjoiY2oyYWZyMXFsMDAxMDMycGowZW4wbWUyciJ9.JinkVr3f9Gc3e310YZJduQ',
      center: [
        55.17937,
        24.976112
      ],
      minZoom: 8,
      maxZoom: 14,
      zoom: 10,
      style: 'mapbox://styles/mapbox/streets-v9'
    },

    BACKEND: {
      host: 'http://api.v1.localhost:3000',
      headers: {
        'X-API-Version': 'api.v1',
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    },

    STATIC: {
      host: 'http://lavo.devlits.com'
    },
    pushNotification: {
      "android": { "senderID": "255529482551" },
      "ios": { "alert": "true", "badge": "true", "sound": "true" },
      // "windows": {}
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }


  if (environment === 'staging') {
   ENV.BACKEND.host = 'https://api.lavohost.com';
    // ENV.BACKEND.host = 'https://api.lavo.devlits.com';

  }

  if (environment === 'lits-staging') {
    ENV.BACKEND.host = 'https://api.lavo.devlits.com';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.BACKEND.host = 'http://api.lavo.devlits.com';
  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:token',
    authenticationRoute: 'intro',
    routeAfterAuthentication: 'main.home.list',
    routeIfAlreadyAuthenticated: 'main.home.list'
  };

  ENV['ember-simple-auth-token'] = {
    identificationField: 'email',
    passwordField: 'password',
    tokenPropertyName: 'included.0.attributes.key', // @TODO: Need improvement
    authorizationPrefix: 'Token token=',
    authorizationHeaderName: 'Authorization',
    headers: ENV.BACKEND.headers
  };

  ENV['googleMap'] = {
    apiKey: 'AIzaSyCkIDwn2-T7ppclB2qUU0PSZ7pfTTFaqmc',
    language: 'en'
  };

  return ENV;
};
