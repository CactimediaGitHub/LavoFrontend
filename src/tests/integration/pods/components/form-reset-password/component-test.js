import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-reset-password', 'Integration | Component | form reset password', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{form-reset-password}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#form-reset-password}}
      template block text
    {{/form-reset-password}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
