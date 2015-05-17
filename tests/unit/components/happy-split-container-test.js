import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import Ember from 'ember';

moduleForComponent('happy-split-container', 'Unit | Component | happy split container', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true,

  afterEach () {
    // Useful during test case development in order to keep your sanity
    Ember.$(window).off('mouseup');
  }
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

test('setting isDragging to true creates additional handlers', function (assert) {
  var events = Ember.$._data(Ember.$(window).get(0), 'events'),
    prevLen = events && events.mouseup ? events.mouseup.length : 0;

  var component = this.subject();
  this.render();

  Ember.run(() => {
    component.set('isDragging', true);

    // Verify that the mouseup handler was added to the window
    events = Ember.$._data(Ember.$(window).get(0), 'events');
    assert.ok(events);
    assert.ok(events.mouseup);
    assert.equal(events.mouseup.length, prevLen + 1);
  });
});

test('setting isDragging to false removes the additional handlers', function (assert) {
  var component = this.subject();
  this.render();

  Ember.run(() => {
    component.set('isDragging', true);

    // Verify that the mouseup handler was added to the window
    var events = Ember.$._data(Ember.$(window).get(0), 'events');
    assert.ok(events);
    assert.ok(events.mouseup);

    var prevLen = events.mouseup.length;
    assert.ok(prevLen > 0);

    // Verify the mouseup handler was removed from the window
    component.set('isDragging', false);
    events = Ember.$._data(Ember.$(window).get(0), 'events');
    assert.ok(!events || !events.mouseup || events.mouseup.length === prevLen - 1);
  });
});

skip('destroying component while dragging removes the additional handlers', function (assert) {
  var prevLen,
    component = this.subject();
  this.render();

  Ember.run(() => {
    component.set('isDragging', true);

    // Verify that the mouseup handler was added to the window
    var events = Ember.$._data(Ember.$(window).get(0), 'events');
    assert.ok(events);
    assert.ok(events.mouseup);

    prevLen = events.mouseup.length;
    assert.ok(prevLen > 0);

    component.destroy();

    // Verify the mouseup handler was removed from the window
    events = Ember.$._data(Ember.$(window).get(0), 'events');
    assert.ok(!events || !events.mouseup || events.mouseup.length === prevLen - 1);
  });
});
