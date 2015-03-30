import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['parentView.isVertical:vertical:horizontal'],
  classNames: ['splitter'],

  setupSplitterBar: function () {
    this.updateDimensions();
  }.on('didInsertElement'),

  updateDimensions: function () {
    var style = this.element.style,
      parent = this.get('parentView'),
      splitterWidth = parent.get('splitterWidth'),
      dimension = `${splitterWidth}px`;

    if (parent.get('isVertical'))
      style.width = dimension;
    else
      style.height = dimension;
  }.observes('parentView.splitterWidth', 'parentView.isVertical')
});
