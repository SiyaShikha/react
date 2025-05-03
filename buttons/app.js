class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timesClicked: 0 };
    this.increment = this.increment.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState(prev => ({ timesClicked: prev.timesClicked + 1 }))
  }

  reset() {
    this.setState(prev => ({ timesClicked: 0 }));
  }

  render() {
    const increamentBtn = React.createElement('button', {
      onClick: this.increment
    },
      `Clicked ${this.state.timesClicked} times`
    );

    const resetBtn = React.createElement('button', {
      onClick: this.reset
    },
      `Reset`
    );

    return React.createElement("div", null, increamentBtn, " ", resetBtn);
  }
}

const container = document.getElementById('main_container');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(Counter));