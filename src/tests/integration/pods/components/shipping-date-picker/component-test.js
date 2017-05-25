import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shipping-date-picker', 'Integration | Component | shipping date picker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{shipping-date-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#shipping-date-picker}}
      template block text
    {{/shipping-date-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
