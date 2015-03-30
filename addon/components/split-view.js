import Ember from 'ember';

export default Ember.Component.extend({
  splitPercentage: 50,

  classNameBindings: ['parentView.isVertical:vertical:horizontal'],
  classNames: ['split-view'],

  setupSplitView: function () {
    this.updateDimensions();
  }.on('didInsertElement'),

  updateDimensions: function () {
    var percentage = this.get('splitPercentage'),
      parent = this.get('parentView'),
      // split the width of the splitter between the left/right or top/bottom views
      splitterWidth = parent.get('splitterWidth') / 2,
      style = this.element.style,
      dimension = `calc( ${percentage}% - ${splitterWidth}px)`;

    if (parent.get('isVertical'))
      style.width = dimension;
    else
      style.height = dimension;

  }.observes('splitPercentage', 'parentView.splitterWidth', 'parentView.isVertical'),

  teardownSplitView: function () {

  }.on('willDestroyElement')
});
