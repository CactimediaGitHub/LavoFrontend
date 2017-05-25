import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-vendor-filter', 'Integration | Component | modal vendor filter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modal-vendor-filter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#modal-vendor-filter}}
      template block text
    {{/modal-vendor-filter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
