import Ember from 'ember';
import DS from 'ember-data';

const { assign } = Ember;

export default DS.JSONAPISerializer.extend({
  serialize(snapshot, options) {
    const json = this._super(...arguments);

    return assign({}, {
      data: {
        type: 'cards',
        attributes: {
          card: json.data.attributes,
          ['remember_me']: true
        }
      }
    });
  }
});

