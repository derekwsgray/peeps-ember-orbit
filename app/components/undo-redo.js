import Ember from 'ember';

export default Ember.Component.extend({

  undo: Ember.inject.service(),

  actions: {

    undo() {
      this.get('undo').undo();
    },

    redo() {
      this.get('undo').redo();
    }
  }
});
