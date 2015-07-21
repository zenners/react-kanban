import React from 'react';

import AltContainer from 'alt/AltContainer';
import {storage, storageName, getInitialData} from '../libs/storage';
import persist from '../decorators/persist';
  
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/lanes';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@DragDropContext(HTML5Backend)
@persist(storage, storageName, () => JSON.parse(alt.takeSnapshot()))
export default class App extends React.Component {
  constructor(props) {
    super(props);
    LaneActions.init(storage.get(getInitialData('LaneStore')));
  }

  addItem() {
    LaneActions.create('new lane')
  }

  render() {
    return (
    	<div>
    		<button onClick={this.addItem.bind(this)}> Add a lane </button>
    		<AltContainer
          stores={[LaneStore]}
          inject={ {
            items: () => LaneStore.getState().lanes || []
          } } >
          <Lanes />
        </AltContainer>
    	</div>
	  );
    	
  }
}
