import Ember from 'ember';

export default Ember.Controller.extend({
  visible: true,
  actions: {
    toggle: function(value){
      this.toggleProperty(value);
    }
  }
});
