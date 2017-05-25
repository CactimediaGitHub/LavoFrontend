import DS from 'ember-data';
import Ember from 'ember';

const { get, assign } = Ember;

export default DS.JSONAPISerializer.extend({
  serialize(snapshot, options) {
    const json = this._super(...arguments);
    const additional = {
      'reviewable-id': get(snapshot, 'record.reviewable.id'),
      'reviewable-type': 'Vendor',
      'reviewer-id': get(snapshot, 'record.reviewer.id'),
      'reviewer-type': 'Customer',
    };

    json.data.attributes = assign({}, json.data.attributes, additional);

    return assign({}, json);
  }
});
