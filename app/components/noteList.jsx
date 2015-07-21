import React from 'react';
import Editable from './editable';
import Note from './Note'
import NoteDndActions from '../actions/NoteDndActions';

export default class NoteList extends React.Component {
	
	render(){
		var notes = this.props.items
		var nodes = notes.map((note, index) => {
			console.log(note)
			return (
			<Note onMove={NoteDndActions.move} className='note' key={'note' + note.id} data={note}>
    			<Editable value={note.task} onEdit={this.props.onEdit.bind(null, index)} />
    		</Note>
			)
		})

		return(
			<ul className="notes">
				{nodes}
			</ul>
		)
	}
}