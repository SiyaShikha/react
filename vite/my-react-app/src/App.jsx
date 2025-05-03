import React from "react";
import "./App.css";
import { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prev) => {
      return { clicks: prev.clicks + this.props.delta };
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Clicked {this.state.clicks} times
      </button>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Counter delta={4} />
        <Counter delta={10} />
      </>
    );
  }
}

export default App;
