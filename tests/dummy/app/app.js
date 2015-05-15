import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import ApplicationView from './views/ApplicationView';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  Resolver: Resolver,
  ApplicationView: ApplicationView
});

loadInitializers(App, config.modulePrefix);

export default App;
