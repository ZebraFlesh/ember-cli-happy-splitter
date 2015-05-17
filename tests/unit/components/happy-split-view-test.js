import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('happy-split-view', 'Unit | Component | happy split view', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true
});

test('it renders', function (assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('view observes parent isVertical property', function (assert) {
  // Creates the component instance
  var component = this.subject({
    parentView: Ember.Object.extend({
      isVertical: true,
      send: function () {
      }
    }).create()
  });

  // Renders the component to the page
  this.render();
  assert.equal(component.get('isVertical'), true);

  Ember.run(() => {
    component.parentView.set('isVertical', false);
    assert.equal(component.get('isVertical'), false);
  });
});

test('view observes parent splitterWidth property', function (assert) {
  // Creates the component instance
  var magic = 42,
    component = this.subject({
      parentView: Ember.Object.extend({
        isVertical: true,
        splitterWidth: magic,
        send: function () {
        }
      }).create()
    });

  // Renders the component to the page
  this.render();
  assert.equal(component.get('splitterWidth'), magic);

  Ember.run(() => {
    component.parentView.set('splitterWidth', magic * 2);
    assert.equal(component.get('splitterWidth'), magic * 2);
  });
});

test('rendering view sends message', function (assert) {
  var tracking = true;
  // Creates the component instance
  this.subject({
    parentView: Ember.Object.extend({
      send: function (actionName) {
        if (tracking) {
          assert.equal('addView', actionName);
        }
      }
    }).create()
  });

  // Renders the component to the page
  this.render();
  tracking = false;
});

test('destroying view sends message', function (assert) {
  var tracking = false;
  // Creates the component instance
  var component = this.subject({
    parentView: Ember.Object.extend({
      send: function (actionName) {
        if (tracking) {
          assert.equal('removeView', actionName);
        }
      }
    }).create()
  });

  // Renders the component to the page
  this.render();

  Ember.run(() => {
    tracking = true;
    component.destroy();
  });
});
