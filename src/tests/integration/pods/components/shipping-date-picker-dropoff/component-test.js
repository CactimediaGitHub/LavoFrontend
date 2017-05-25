import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shipping-date-picker-dropoff', 'Integration | Component | shipping date picker dropoff', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{shipping-date-picker-dropoff}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#shipping-date-picker-dropoff}}
      template block text
    {{/shipping-date-picker-dropoff}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
