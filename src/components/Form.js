import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addThing } from "../redux/actions/index";

const mapDispatchToProps = dispatch => {
  return {
    addThing: thing => dispatch(addThing(thing))
  };
};

class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[ event.target.id ]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {title} = this.state;
    const id = uuidv1();
    this.props.addThing({title, id});
    this.setState({title: ""});
  }

  render() {
    const {title} = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="">
          <label className={'label'} htmlFor="title">Title</label>
          <div className={'form-collapse'}>
            <div className={'input item item-main'}>
              <input
                type="text"
                className="form-control"
                placeholder={'name the thing'}
                id="title"
                value={title}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="item button button-primary">
              SAVE
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;
