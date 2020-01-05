import React, { Component } from 'react';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      todoList: [{
        id: '1',
        title: 'Wake up',
        date: new Date()
      }, {
        id: '2',
        title: 'Goto market',
        date: new Date()
      }, {
        id: '3',
        title: 'Buy some stuff',
        date: new Date()
      }, {
        id: '4',
        title: 'Come back to room',
        date: new Date()
      }],
      completedTask : []
    }
  }

  onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      todoList: [...this.state.todoList, {
        id: this.state.todoList.length+1,
        title: event.target.item.value,
        done: false,
        date: new Date()
      }]
    });

    event.target.item.value = '';
  }

  onDeleteHandle() {
    let id = arguments[0];

    this.setState({
      todoList: this.state.todoList.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  onDeleteCompletedHandle() {
    let id = arguments[0];

    this.setState({
      completedTask: this.state.completedTask.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1]
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.setState({
      todoList: this.state.todoList.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });

    this.setState({
      edit: false
    });
  }

  onCompleteHandle() {
    let id = arguments[0];

    // this.setState({
    //   todoList: this.state.todoList.map(item => {
    //     if (item.id === id) {
    //       item['done'] = true;
    //       this.state.completedTask.push(item);
    //       return item;
    //     }
    //     return item;
    //   })
    // });

    this.setState({
      todoList: this.state.todoList.filter(item => {
        if (item.id !== id) {
          return item;
        }
        if (item.id === id) {
          this.state.completedTask.push(item);
        }
      })
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
        <input type="text" name="updatedItem" className="item" defaultValue={this.state.title} />
        <button className="update-add-item">Update</button>
      </form>
    }
  }

  renderAddForm() {
    if(!this.state.edit) {
    return <form onSubmit={this.onSubmitHandle.bind(this)}>
        <input type="text" name="item" className="item" />
        <button className="btn-add-item">Add</button>
    </form>
    }
  }

  render() {
    let completedLength = '';
    if (this.state.completedTask.length) {
      completedLength =  <span>({this.state.completedTask.length})</span>
    } else {
      completedLength = ''
    }
    return (
      <div>
        {this.renderEditForm()}
        {this.renderAddForm()}
        <h3>Task-to-do ({this.state.todoList.length})</h3>
        <ul>
          {this.state.todoList.map(item => (
            <li key={item.id}>
              {item.title}
              <button onClick={this.onCompleteHandle.bind(this, item.id)}>Complete</button>
              <button onClick={this.onEditHandle.bind(this, item.id, item.title)}>Edit</button>
              <button onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <h3>Completed-task {completedLength}</h3>
        <ul>
          {this.state.completedTask.map(item => (
            <li key={item.id}>
              {item.title}
              <button onClick={this.onDeleteCompletedHandle.bind(this, item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;