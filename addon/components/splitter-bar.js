import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isVertical:vertical:horizontal'],
  classNames: ['splitter'],

  isVertical: Ember.computed.readOnly('parentView.isVertical'),
  splitterWidth: Ember.computed.readOnly('parentView.splitterWidth'),

  setupSplitterBar: function () {
    this.updateDimensions();
  }.on('didInsertElement'),

  updateDimensions: function () {
    var style = this.element.style,
      splitterWidth = this.get('splitterWidth'),
      dimension = `${splitterWidth}px`;

    if (this.get('isVertical')) {
      style.width = dimension;
    }
    else {
      style.height = dimension;
    }
  }.observes('splitterWidth', 'isVertical'),

  mouseDown: function (event) {
    if (event.button === 0 && !event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
      this.get('parentView').send('dragSplitter');
    }
  }
});
