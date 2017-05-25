import config from 'lavo-mobile/config/environment';
import TokenAuthenticator from 'ember-simple-auth-token/authenticators/token';

export default TokenAuthenticator.extend({
  init() {
    this._super(...arguments);

    this.set('serverTokenEndpoint', `${config.BACKEND.host}/signin`);
  },
  
  getAuthenticateData(credentials) {
    const authentication = {
      [this.passwordField]: credentials.password,
      [this.identificationField]: credentials.email
    };

    return {
      type: 'signin',
      data: {
        attributes: authentication
      }
    };
  }
});
