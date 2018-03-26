import React from 'react';
import logo from "../logo.svg";
import { connect } from "react-redux";

class Dog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { fetching, dog, onRequestDog, error } = this.props;
    return (
      <React.Fragment>

        <div className="App">
          <header className="App-header">
            <img src={dog || logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to Dog Saga</h1>
          </header>

          {dog ?
            ( <p className="App-intro">Keep clicking for new dogs</p> )
            : ( <p className="App-intro">Replace the React icon with a dog!</p> )}

          {fetching ?
            ( <button disabled>Fetching...</button> )
            : ( <button onClick={onRequestDog}>Request a Dog</button> )}

          {error && <p style={{color: "red"}}>Uh oh - something went wrong!</p>}

        </div>


      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles,
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch({type: "API_CALL_REQUEST"})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dog);
