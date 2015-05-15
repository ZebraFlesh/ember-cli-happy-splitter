import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isVertical:vertical:horizontal', 'isDragging:dragging'],
  classNames: ['happy-splitter'],

  isDragging: Ember.computed.readOnly('parentView.isResizing'),
  isVertical: Ember.computed.readOnly('parentView.isVertical'),
  splitterWidth: Ember.computed.readOnly('parentView.splitterWidth'),

  setupSplitterBar: Ember.on('didInsertElement', function () {
    this.set('target', this.get('parentView'));
    this.updateDimensions();
  }),

  updateDimensions: Ember.observer('splitterWidth', 'isVertical', function () {
    var style = this.element.style,
      splitterWidth = this.get('splitterWidth'),
      dimension = `${splitterWidth}px`;

    if (this.get('isVertical')) {
      style.width = dimension;
    }
    else {
      style.height = dimension;
    }
  }),

  mouseDown: function (event) {
    if (!event.button && !event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
      this.send('dragSplitter');
    }
  }
});
