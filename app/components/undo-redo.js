import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

  undo: service(),

  actions: {

    undo() {
      this.get('undo').undo();
    },

    redo() {
      this.get('undo').redo();
    }
  }
});
