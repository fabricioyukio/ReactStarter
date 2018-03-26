import React from "react";
import List from './components/List';
import Form from './components/Form';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
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

export default App;
