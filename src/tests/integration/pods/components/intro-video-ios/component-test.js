import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('intro-video-ios', 'Integration | Component | intro video ios', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{intro-video-ios}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#intro-video-ios}}
      template block text
    {{/intro-video-ios}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
