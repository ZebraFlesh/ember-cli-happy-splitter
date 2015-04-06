import Ember from 'ember';

export default Ember.Component.extend({
  isVertical: true,
  splitterWidth: 6,

  _dragging: false,
  _leading: undefined,
  _trailing: undefined,

  classNames: ['split-container'],
  classNameBindings: ['_dragging:disable-select'],

  setupSplitContainer: Ember.on('didInsertElement', function () {

  }),

  teardownSplitContainer: Ember.on('willDestroyElement', function () {
    if (this.get('_dragging')) {
      this._removeEventHandlers();
    }
  }),

  mouseUp: function () {
    if (this.get('_dragging')) {
      this._removeEventHandlers();
      this.set('_dragging', false);
    }
  },

  _removeEventHandlers: function () {
    var $element = this.$();
    $element.off('mousemove', this._$onMouseMove);
    $element.off('selectstart', this._$blockSelectionInIE);
  },

  _$onMouseMove: function (event) {
    var instance = event.data,
      leading = instance._leading,
      trailing = instance._trailing,
      percentage;

    if (instance.isVertical) {
      percentage = (event.pageX - leading.$().offset().left) / instance.$().width() * 100;
    }
    else {
      percentage = (event.pageY - leading.$().offset().top) / instance.$().height() * 100;
    }

    leading.set('splitPercentage', percentage);
    trailing.set('splitPercentage', 100 - percentage);
  },

  _$blockSelectionInIE: function () {
    return false;
  },

  actions: {
    dragSplitter: function () {
      var $element;

      if (this._leading === undefined || this._leading === null || this._trailing === undefined || this.trailing === null) {
        return;
      }

      $element = this.$();
      this.set('_dragging', true);
      $element.on('selectstart', this._$blockSelectionInIE);
      $element.on('mousemove', this, this._$onMouseMove);
    },

    addView: function (view) {
      if (view === undefined || view === null) {
        return;
      }

      if (this._leading === undefined) {
        this._leading = view;
      }
      else if (this._trailing === undefined) {
        this._trailing = view;
      }
    },

    removeView: function (view) {
      if (this._leading === view) {
        this._leading = undefined;
      }
      else if (this._trailing === view) {
        this._trailing = undefined;
      }
    }
  }
});
