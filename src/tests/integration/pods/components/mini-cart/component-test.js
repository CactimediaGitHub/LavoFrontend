import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mini-cart', 'Integration | Component | mini cart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mini-cart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mini-cart}}
      template block text
    {{/mini-cart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
