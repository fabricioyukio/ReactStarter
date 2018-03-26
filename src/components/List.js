import React from "react";
import { connect } from "react-redux";
import { removeThing } from "../redux/actions/index";

const mapStateToProps = state => {
  return {things: state.things};
};

const mapDispatchToProps = dispatch => {
  return {
    removeThing: thing_index => dispatch(removeThing(thing_index))
  };
};

class ConnectedList extends React.Component {
  constructor() {
    super();
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(e) {
    console.log('TRIGER', e.target);
    console.log('STATE BEFORE', this.props);
    const thing_index = parseInt(e.target.id, 10);
    console.log('PAYLOAD', thing_index);
    this.props.removeThing(thing_index);
    console.log('STATE AFTER', this.props);
  }

  render() {
    const {things} = this.props;
    return (
      <ul className="list-group list-group-flush">
        {things.map((el, i) => (
          <li className="list-group-item" key={el.id}>
            <div className={'button-group'}>
              <span className={'button button-outlined'}>{el.title}</span>
              <button className={'button button-primary'} onClick={this.removeItem} id={i}>
                REMOVER &nbsp; <i class="fa fa-times"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;
