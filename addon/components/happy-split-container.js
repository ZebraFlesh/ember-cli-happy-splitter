import Ember from 'ember';

export default Ember.Component.extend({
  isResizing: false,
  isVertical: true,
  splitterWidth: 6,

  _dragStarted: false,
  _splitLine: undefined,
  _leading: undefined,
  _trailing: undefined,

  classNames: ['happy-split-container'],
  classNameBindings: ['isVertical:vertical:horizontal', 'isResizing:dragging', '_dragStarted:disable-select'],

  teardownSplitContainer: Ember.on('willDestroyElement', function () {
    if (this.get('_dragStarted')) {
      this._removeEventHandlers();
    }
  }),

  mouseUp: function () {
    if (this.get('_dragStarted')) {
      this._removeEventHandlers();
      this.set('isResizing', false);
      this.set('_dragStarted', false);
    }
  },

  _removeEventHandlers: function () {
    var $element = this.$();
    $element.off('mousemove', this._$onMouseMove);
    $element.off('selectstart', this._$blockSelectionInIE);
  },

  _$onMouseMove: function (event) {
    var instance = event.data,
      vertical = instance.get('isVertical'),
      splitLine = instance.get('_splitLine'),
      leading = instance.get('_leading'),
      trailing = instance.get('_trailing'),
      percentage;

    instance.set('isResizing', true);

    // Compute the new percentage of the leading view.
    if (vertical) {
      percentage = (event.pageX - leading.$().offset().left) / instance.$().width() * 100;
    }
    else {
      percentage = (event.pageY - leading.$().offset().top) / instance.$().height() * 100;
    }

    // Set the split percentages based on the direction of mouse movement.
    if ((vertical && event.pageX < splitLine) || (!vertical && event.pageY < splitLine)) {
      leading.set('splitPercentage', percentage);
      trailing.set('splitPercentage', 100 - leading.get('splitPercentage'));
    }
    else {
      trailing.set('splitPercentage', 100 - percentage);
      leading.set('splitPercentage', 100 - trailing.get('splitPercentage'));
    }
  },

  _$blockSelectionInIE: function () {
    return false;
  },

  actions: {
    dragSplitter: function () {
      var $element,
        $splitter,
        line;

      if (this._leading === undefined || this._leading === null || this._trailing === undefined || this._trailing === null) {
        return;
      }

      // Determine the current split line of the container. This is used to determine the direction of mouse movement.
      $splitter = this.$('.happy-splitter');
      if (this.get('isVertical')) {
        line = ($splitter.width() / 2) + $splitter.offset().left;
      }
      else {
        line = ($splitter.height() / 2) + $splitter.offset().top;
      }
      this.set('_splitLine', line);

      $element = this.$();
      this.set('_dragStarted', true);
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
