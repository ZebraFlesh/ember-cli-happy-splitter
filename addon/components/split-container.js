import Ember from 'ember';

export default Ember.Component.extend({
  isVertical: true,
  splitterWidth: 6,

  classNames: ['split-container'],

  setupSplitContainer: function () {

  }.on('didInsertElement'),

  teardownSplitContainer: function () {
    this.get('split-container').destroy();
  }.on('willDestroyElement')
});
