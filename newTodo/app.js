const { Component, createElement } = React;
const { createRoot } = ReactDOM;

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const inputElement = createElement('input', {
      type: 'text',
      placeholder: 'Enter Todo',
      value: this.state.value,
      onChange: this.handleChange
    });

    const submitBtn = createElement('button', {
      onClick: () => {
        if (this.state.value === '') {
          return;
        }
        this.props.onSubmit(this.state.value);
        this.state.value = '';
      },
    }, 'Add');

    return createElement('div', null, inputElement, ' ', submitBtn);
  }
}

class TaskItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const checkbox = createElement('input', {
      type: 'checkbox',
      // checked: this.props.done,
      readOnly: true,
      onChange: () => this.props.toggle(this.props.taskId),
    });

    const item = createElement('span', null, this.props.task);

    return createElement('div', null, checkbox, item);
  }
}

class Tasks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return createElement('div', null, this.props.tasks.map((item, index) => {
      return createElement(TaskItem, { ...item, key: index, toggle: this.props.toggle });
    }))
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.add = this.add.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  add(item) {
    const task = { task: item, taskId: Date.now(), done: false };
    return this.setState({ tasks: [...this.state.tasks, task] });
  }

  toggle(taskId) {
    const updatedTasks = this.state.tasks.map(task => {
      if (task.taskId === taskId) {
        task.done = !task.done;
      }
      return task;
    })

    return { ...this.state, tasks: updatedTasks }
  }

  render() {
    const inputElement = createElement(Input, { onSubmit: this.add });
    const tasks = createElement(Tasks, { tasks: this.state.tasks, toggle: this.toggle });
    return createElement('div', null, inputElement, tasks);
  }
}

const container = document.getElementById('main_container');
const root = createRoot(container);

// root.render(createElement(Todo, {
//   items: [
//     { task: 'something', taskId: 1, done: false },
//     { task: 'something else', taskId: 2, done: false },
//     { task: 'three', taskId: 3, done: false },
//   ]
// }));

root.render(createElement(Todo));