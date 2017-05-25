import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('slidable-order-item', 'Integration | Component | slidable order item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{slidable-order-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#slidable-order-item}}
      template block text
    {{/slidable-order-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
