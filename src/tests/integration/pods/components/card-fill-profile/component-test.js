import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card-fill-profile', 'Integration | Component | card fill profile', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card-fill-profile}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card-fill-profile}}
      template block text
    {{/card-fill-profile}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
