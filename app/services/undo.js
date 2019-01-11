import Service, { inject as service } from '@ember/service';
import { notEmpty } from '@ember/object/computed';

/*

// From Dan Gebhardt (@dgeb)
let inverseOps = [];

store.transformsSince(transformId).forEach(t => {
  Array.prototype.push.apply(inverseOps, store.getInverseOperations(t.id))
});

store.update(inverseOps);

*/

/**
 * Undo and Redo operations
 */
export default Service.extend({

  store: service(),

  undoStack: null,
  redoStack: null,

  init() {
    this._super(...arguments);

    this.set('redoStack', []);
    this.set('undoStack', []);
  },

  canUndo: notEmpty('undoStack'),
  canRedo: notEmpty('redoStack'),

  undo() {
    // if(!this.get('canUndo')) {
    //   return;
    // }
    // TODO: strategy to log ops to undo....except redos...????
    const store = this.get('store');
    const transformId = store.transformLog.head;
    const transform = store.getTransform(transformId);
    const inverseOperations  = store.getInverseOperations(transformId);

    store.update(inverseOperations).then(() => {
        this.get('redoStack').pushObject(transform.operations);
    });
  },

  redo() {
    if(!this.get('canRedo')) {
      return;
    }

    const opsToRedo = this.get('redoStack.lastObject');
    this.get('store').update(opsToRedo).then(() => {
      this.set('redoStack', this.get('redoStack').pop());
    });
  }

});
