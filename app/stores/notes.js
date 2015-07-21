import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';
import uuid from 'node-uuid';
import NoteDndActions from '../actions/NoteDndActions';

export default class NoteStore {
  constructor(actions: Object) {
    this.bindActions(actions);

    this.notes = [];
  }

  init(data) {
    this.setState(Array.isArray(data && data.notes) ? data : {
      notes: []
    });
  }
  
  create(task) {
    const notes = this.notes;
    console.log('create')

    this.setState({
      notes: notes.concat({task, id: uuid.v4()})
    });
  }

  update({id, task}) {
    const notes = this.notes;

    notes[id].task = task;

    this.setState({notes});
  }

  remove(id) {
    const notes = this.notes;

    this.setState({
      notes: notes.slice(0, id).concat(notes.slice(id + 1))
    });
  }

  move({source, target}) {
    console.log('source', source, 'target', target)
    const notes = this.notes;
    const sourceIndex = findIndex(notes, 'id', source.id);
    const targetIndex = findIndex(notes, 'id', target.id);

    if(sourceIndex >= 0 && targetIndex >= 0) {
      this.setState({
        notes: update(notes, {
          $splice: [
            [sourceIndex, 1],
            [targetIndex, 0, source]
          ]
        })
      });
    }
    else if(targetIndex >= 0) {
      this.setState({
        notes: update(notes, {
          $splice: [
            [targetIndex, 0, source]
          ]
        })
      });
    }
    else if(sourceIndex >= 0) {
      this.remove(sourceIndex);
    }
  }
}

function findIndex(arr, prop, value) {
  var o = arr.filter(c => c[prop] === value)[0];

  return o && arr.indexOf(o);
}



