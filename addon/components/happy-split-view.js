import Ember from 'ember';

export default Ember.Component.extend({
  isVertical: Ember.computed.readOnly('parentView.isVertical'),
  splitterWidth: Ember.computed.readOnly('parentView.splitterWidth'),
  siblingsVisible: Ember.computed.and('parentView.leadingVisible', 'parentView.trailingVisible'),

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

  initSplitView: Ember.on('init', function(){
    this.get('parentView').send('addView', this, this.get('isVisible'));
  }),

  setupSplitView: Ember.on('didInsertElement', function () {
    this.updateDimensions();
  }),

  teardownSplitView: Ember.on('willDestroyElement', function () {
    this.get('parentView').send('removeView', this);
  }),

  updateSplitVisible: Ember.observer('isVisible', function(){
    this.get('parentView').send(this.get('isVisible') ? 'showView' : 'hideView', this);
  }),

  updateDimensions: Ember.observer('splitPercentage', 'splitterWidth', 'isVertical','siblingsVisible', function () {
    var percentage = this.get('splitPercentage'),
      // split the width of the splitter between the left/right or top/bottom views
      splitterWidth = this.get('splitterWidth') / 2,
      style = this.element.style,
      dimension = this.get('siblingsVisible') ? `calc(${percentage}% - ${splitterWidth}px)` : 'calc(100%)';

    if (this.get('isVertical')) {
      style.width = dimension;
    }
    else {
      style.height = dimension;
    }
  })
});
