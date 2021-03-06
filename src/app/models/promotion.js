import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr(),
  description: attr(),
  icon: attr(),
  startsAt: attr('date'),
  expiresAt: attr('date'),
  backgroundImageUrl: attr()
});
