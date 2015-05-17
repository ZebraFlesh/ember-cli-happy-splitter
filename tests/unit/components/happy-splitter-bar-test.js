import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('happy-splitter-bar', 'Unit | Component | happy splitter bar', {
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

test('splitter observes parent isResizing property', function (assert) {
  // Creates the component instance
  var component = this.subject({
    parentView: Ember.Object.create({isResizing: false})
  });

  // Renders the component to the page
  this.render();
  assert.equal(component.get('isDragging'), false);

  Ember.run(() => {
    component.parentView.set('isResizing', true);
    assert.equal(component.get('isDragging'), true);
  });
});

test('splitter observes parent isVertical property', function (assert) {
  // Creates the component instance
  var component = this.subject({
    parentView: Ember.Object.create({isVertical: true})
  });

  // Renders the component to the page
  this.render();
  assert.equal(component.get('isVertical'), true);

  Ember.run(() => {
    component.parentView.set('isVertical', false);
    assert.equal(component.get('isVertical'), false);
  });
});

test('splitter observes parent splitterWidth property', function (assert) {
  // Creates the component instance
  var magic = 42,
    component = this.subject({
      parentView: Ember.Object.create({isVertical: true, splitterWidth: magic})
    });

  // Renders the component to the page
  this.render();
  assert.equal(component.get('splitterWidth'), magic);

  Ember.run(() => {
    component.parentView.set('splitterWidth', magic * 2);
    assert.equal(component.get('splitterWidth'), magic * 2);
  });
});

test('changing to horizontal sets height', function (assert) {
  // Creates the component instance
  var magic = 42,
    component = this.subject({
      parentView: Ember.Object.create({isVertical: true, splitterWidth: magic})
    });

  // Renders the component to the page
  this.render();
  assert.equal(component.$().width(), magic);

  Ember.run(() => {
    component.parentView.set('isVertical', false);
    assert.equal(component.$().height(), magic);
  });
});

test('mousedown sends message', function (assert) {
  // Creates the component instance
  var component = this.subject({
    parentView: Ember.Object.extend({
      send: function (actionName) {
          assert.equal('dragSplitter', actionName);
      }
    }).create()
  });

  // Renders the component to the page
  this.render();

  // Send a mousedown event
  component.$().mousedown();
});
