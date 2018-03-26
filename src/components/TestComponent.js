import React from 'react';
import List from './List';
import Form from './Form';

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <h2>Test Component</h2>
        <p>If it is working, then it's all right!</p>
        <hr />
        <div class="grid-container full">
          <div className="grid-x grid-padding-x">
            <div className="cell auto">
              <h2>Things</h2>
              <List/>
            </div>
            <div className="cell auto">
              <h2>Add a new thing</h2>
              <Form/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
