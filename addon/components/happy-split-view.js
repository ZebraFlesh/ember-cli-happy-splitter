import Ember from 'ember';

export default Ember.Component.extend({
  splitContainer: null,
  isVertical: Ember.computed.readOnly('splitContainer.isVertical'),
  splitterWidth: Ember.computed.readOnly('splitContainer.splitterWidth'),

  minimumPercentage: 10,

  classNameBindings: ['isVertical:vertical:horizontal'],
  classNames: ['happy-split-view'],

  _percentage: undefined,
  splitPercentage: Ember.computed('minimumPercentage', {
    get: function () {
      return this._percentage === undefined ? 50 : this._percentage;
    },
    set: function (key, value) {
      this._percentage = Math.max(this.get('minimumPercentage'), value);
      return this._percentage;
    }
  }),

  setupSplitView: Ember.on('didInsertElement', function () {
    this.updateDimensions();
    this.get('splitContainer').send('addView', this);
  }),

  teardownSplitView: Ember.on('willDestroyElement', function () {
    this.get('splitContainer').send('removeView', this);
  }),

  updateDimensions: Ember.observer('splitPercentage', 'splitterWidth', 'isVertical', function () {
    var percentage = this.get('splitPercentage'),
      // split the width of the splitter between the left/right or top/bottom views
      splitterWidth = this.get('splitterWidth') / 2,
      style = this.element.style,
      dimension = `calc(${percentage}% - ${splitterWidth}px)`;

    if (this.get('isVertical')) {
      style.width = dimension;
    }
    else {
      style.height = dimension;
    }
  })
});
