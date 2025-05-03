const { Component, createElement } = React;
const { createRoot } = ReactDOM;

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { noOfClicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => {
      return { noOfClicks: prevState.noOfClicks + 1 };
    });
  }


  isChecked() {
    return this.state.noOfClicks % 3 === 0 && this.state.noOfClicks !== 0;
  }

  render() {
    return createElement('input', {
      type: 'checkbox',
      onClick: this.handleClick,
      checked: this.isChecked(),
      readOnly: true
    });
  }
}

const container = document.getElementById('main_container');
const root = createRoot(container);
root.render(createElement(CheckBox));