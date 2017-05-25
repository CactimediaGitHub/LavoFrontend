import Ember from 'ember';

const { inject: { service }, String: { singularize }, get, Mixin, uuid } = Ember;

export default Mixin.create({
  session: service(),
  network:service(),
  beforeModel() {
    this._super(...arguments);

    if(get(this,'network.isOffline')) {
      return this.transitionTo({ queryParams: { modalConnection: uuid() } });
    }

    if (get(this, 'session.isAuthenticated')) {
      let { id, type } = get(this, 'session.data.authenticated.data');
      type = singularize(type);
      if (!this.store.hasRecordForId(type, id)) {
        return this.store.findRecord(type, id).catch(() => {});
      }
    }

    return;
  }

});
