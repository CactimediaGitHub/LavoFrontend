import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-successful-registration', 'Integration | Component | modal successful registration', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modal-successful-registration}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modal-successful-registration}}
      template block text
    {{/modal-successful-registration}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
