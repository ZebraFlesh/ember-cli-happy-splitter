import Ember from 'ember';

export default Ember.Component.extend({
  isVertical: Ember.computed.readOnly('parentView.isVertical'),
  splitterWidth: Ember.computed.readOnly('parentView.splitterWidth'),

  minimumPercentage: 10,

  classNameBindings: ['isVertical:vertical:horizontal'],
  classNames: ['happy-split-view'],

  splitPercentage: Ember.computed(function (key, value/*, oldValue*/) {

    if (value === undefined) {
      value = 50;
    }

    // getter
    if (arguments.length === 1) {
      return value;
    } // setter
    else {
      return Math.max(this.get('minimumPercentage'), value);
    }
  }).property('minimumPercentage'),

  setupSplitView: Ember.on('didInsertElement', function () {
    this.updateDimensions();
    this.get('parentView').send('addView', this);
  }),

  teardownSplitView: Ember.on('willDestroyElement', function () {
    this.get('parentView').send('removeView', this);
  }),

  updateDimensions: Ember.observer('splitPercentage', 'splitterWidth', 'isVertical', function () {
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
  })
});
