import React from 'react';

export default class Editable extends React.Component {
  constructor(props){
  	super(props);

  	this.state = {
  		editing: false
  	};
  }

  edit(){
  	this.setState({editing: !this.state.editing})
  }

   checkEnter(e) {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    this.props.onEdit(e.target.value);
    this.edit()
  }

  render() {
  	const {value, onEdit, ...props} = this.props
    return (
    	<div {...props}> {
    		this.state.editing ? <input type='text'
          defaultValue={value}
          onBlur={(e) => this.finishEdit(e)}
          onKeyPress={(e) => this.checkEnter(e)}
          />
          : <div onClick={this.edit.bind(this)}>{value}</div>
    	}
    	</div>
    	
  	);
  }
}