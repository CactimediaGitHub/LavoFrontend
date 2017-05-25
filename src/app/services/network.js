import Ember from 'ember';

const { set, computed, Service } = Ember;

export default Service.extend({
  isOnline: computed.not('isOffline'),
  isOffline: computed(function() {
    return this.getStatus();
  }),

  init() {
    this._super(...arguments);

    document.addEventListener('offline', this.updateStatus.bind(this), false);
    document.addEventListener('online', this.updateStatus.bind(this), false);
  },

  getStatus() {
    return window.Connection && (window.Connection.NONE === window.navigator.connection.type);
  },

  updateStatus() {
    set(this, 'isOffline', this.getStatus());
  }
});
