import DS from 'ember-data';
import Ember from 'ember';

const { isArray } = Ember;

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (!isArray(payload.data)&&payload.meta) {
      payload.data.attributes['current-user-has-orders'] = payload.meta['order-count'] > 0;
      payload.data.attributes['can-review'] = payload.meta['can-review'];
    }

    return this._super(...arguments);
  },
  serializeAttribute(snapshot, json, key, attributes) {
    if (snapshot.record.get('isNew') || snapshot.changedAttributes()[key]) {
      this._super(snapshot, json, key, attributes);
    }
  }
});
