import Ember from 'ember';

export default Ember.Component.extend({
  splitContainer: null,
  classNameBindings: ['isVertical:vertical:horizontal', 'isDragging:dragging'],
  classNames: ['happy-splitter'],

  isDragging: Ember.computed.readOnly('splitContainer.isDragging'),
  isVertical: Ember.computed.readOnly('splitContainer.isVertical'),
  splitterWidth: Ember.computed.readOnly('splitContainer.splitterWidth'),

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

  mouseDown (event) {
    if (!event.button && !event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
      this.get('splitContainer').send('dragSplitter', this.$());
    }
  }
});
