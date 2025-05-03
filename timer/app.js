const { Component, createElement } = React;
const { createRoot } = ReactDOM;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0, max: props.maxTime };
  }

  render() {
    return createElement('p', { style: { fontSize: '24px' } }, `Seconds: ${this.state.seconds}`)
  }

  componentDidMount() {
    const id = setInterval(() => {
      if (this.state.seconds === this.state.max) {
        clearInterval(id);
        this.setState({ seconds: 'Times Up' });
        return;
      }
      this.setState(prev => ({ seconds: prev.seconds + 1 }))
    }, 1000);
  }
}

const container = document.getElementById('main_container');
const root = createRoot(container);
root.render(createElement('div', null, createElement(Timer, { maxTime: 5 }), createElement(Timer, { maxTime: 10 })));