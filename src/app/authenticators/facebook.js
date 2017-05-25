import Ember from 'ember';
import config from 'lavo-mobile/config/environment';
import TokenAuthenticator from 'ember-simple-auth-token/authenticators/token';

const { RSVP, run } = Ember;

const fbPlugin = window.facebookConnectPlugin;
const permissions = ['email'];

export default TokenAuthenticator.extend({
  init() {
    this._super(...arguments);

    this.set('serverTokenEndpoint', `${config.BACKEND.host}/social_signin`);
  },

  authenticate() {
    return this.requestAccessToken()
      .then((facebookResponse) => {
        //@TODO: Temporary solution. Change the code when backend will be fixed.
        const headers = {
          'Authorization': `Token token=${facebookResponse.authResponse.accessToken}`
        };

        return new RSVP.Promise((resolve, reject) => {
          this.makeRequest({}, headers)
            .then(response => {
              run(() => {
                resolve(this.getResponseData(response));
              });
            }, xhr => {
              run(() => {
                reject(xhr.responseJSON || xhr.responseText);
              });
            });
        });
      });
  },

  requestAccessToken() {
    return new RSVP.Promise((resolve, reject) => {
      fbPlugin.login(permissions, resolve, reject);
    });
  }
});
