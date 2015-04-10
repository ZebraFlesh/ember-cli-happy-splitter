import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isVertical:vertical:horizontal', 'isDragging:dragging'],
  classNames: ['happy-splitter'],

  isDragging: Ember.computed.readOnly('parentView.isResizing'),
  isVertical: Ember.computed.readOnly('parentView.isVertical'),
  splitterWidth: Ember.computed.readOnly('parentView.splitterWidth'),

  setupSplitterBar: Ember.on('didInsertElement', function () {
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
    if (event.button === 0 && !event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
      this.get('parentView').send('dragSplitter');
    }
  }
});
