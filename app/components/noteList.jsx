import React from 'react';
import Editable from './editable';
import Note from './Note'
import NoteDndActions from '../actions/NoteDndActions';

export default class NoteList extends React.Component {
	
	render(){
		console.log(NoteDndActions.move)
		var notes = this.props.items
		var nodes = notes.map((note, index) => {
			return (
			<Note onMove={NoteDndActions.move} className='note' key={'note' + index}>
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