import React from 'react';

import Lane from './Lane';

export default class Lanes extends React.Component {
  constructor(props: {
    items: Array;
  }) {
    super(props);
  }
  render() {
    var laneList = this.props.items.map((lane, index) => {
      return <Lane className="lane" key={'lane-'+ index} i={index} {...lane} />;
    })
    return (
      <div className='lanes'>
        {laneList}
      </div>
    );
  }
}