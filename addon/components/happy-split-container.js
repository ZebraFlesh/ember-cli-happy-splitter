import Ember from 'ember';
import jQuery from 'jquery';  // necessary for jshint to pass

export default Ember.Component.extend({
  isDragging: false,
  isVertical: true,
  splitterWidth: 6,

  _splitLine: undefined,
  _leading: undefined,
  _trailing: undefined,

  classNames: ['happy-split-container'],
  classNameBindings: ['isVertical:vertical:horizontal', 'isResizing:dragging', 'isDragging:disable-select'],

  teardownSplitContainer: Ember.on('willDestroyElement', function () {
    this.set('isDragging', false);
    //this.updateEventHandlers();
  }),

  mouseUp () {
    this.set('isDragging', false);
  },

  mouseMove (event) {
    var vertical, splitLine, leading, trailing, percentage;

    if (!this.get('isDragging')) {
      return;
    }

    vertical = this.get('isVertical');
    splitLine = this._splitLine;
    leading = this._leading;
    trailing = this._trailing;

    // Compute the new percentage of the leading view.
    if (vertical) {
      percentage = (event.pageX - leading.$().offset().left) / this.$().width() * 100;
    }
    else {
      percentage = (event.pageY - leading.$().offset().top) / this.$().height() * 100;
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

  updateEventHandlers: Ember.observer('isDragging', function () {
    var $element = this.$(),
      $window = Ember.$(window);

    if (this.get('isDragging')) {
      $element.on('selectstart', this._$blockSelectionInIE9);
      $window.on('mouseup', this, this._$onWindowMouseUp);
    }
    else {
      $element.off('selectstart', this._$blockSelectionInIE9);
      $window.off('mouseup', this._$onWindowMouseUp);
    }
  }),

  // If you drag the mouse outside of the ember application's root element and then release it, you
  // don't get an event that the mouseup event happened. So we add a handler to the window object
  // that will invoke the mouseUp event where it's needed.
  _$onWindowMouseUp: function (event) {
    event.data.mouseUp();
  },

  // IE9 seems to like to select text when you drag the splitter.  Returning false from this
  // custom IE event
  _$blockSelectionInIE9: function () {
    return false;
  },

  actions: {
    dragSplitter: function ($splitter) {
      var line;

      if (Ember.isNone(this._leading) || Ember.isNone(this._trailing) || !($splitter instanceof jQuery)) {
        return;
      }

      // Determine the current split line of the container. This is used to determine the direction of mouse movement.
      if (this.get('isVertical')) {
        line = ($splitter.width() / 2) + $splitter.offset().left;
      }
      else {
        line = ($splitter.height() / 2) + $splitter.offset().top;
      }
      this._splitLine = line;

      this.set('isDragging', true);
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
