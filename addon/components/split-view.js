import Ember from 'ember';

export default Ember.Component.extend({
  isVertical: Ember.computed.readOnly('parentView.isVertical'),
  splitterWidth: Ember.computed.readOnly('parentView.splitterWidth'),

  splitPercentage: 50,

  classNameBindings: ['isVertical:vertical:horizontal'],
  classNames: ['split-view'],

  setupSplitView: function () {
    this.updateDimensions();
    this.get('parentView').send('addView', this);
  }.on('didInsertElement'),

  teardownSplitView: function () {
    this.get('parentView').send('removeView', this);
  }.on('willDestroyElement'),

  updateDimensions: function () {
    var percentage = this.get('splitPercentage'),
      // split the width of the splitter between the left/right or top/bottom views
      splitterWidth = this.get('splitterWidth') / 2,
      style = this.element.style,
      dimension = `calc( ${percentage}% - ${splitterWidth}px)`;

    if (this.get('isVertical')) {
      style.width = dimension;
    }
    else {
      style.height = dimension;
    }
  }.observes('splitPercentage', 'splitterWidth', 'isVertical')
});
