import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { fetchTasks, addTask, deleteTask } from '../services/apiService';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            showAddItemInput: false,
            newItemText: '',
        };
    }
/*
    componentDidMount() {
        fetchTasks()
            .then(tasks => {
                const formattedTasks = tasks.map(task => ({
                    ...task,
                    title: task.description
                }));
                this.setState({ todoList: formattedTasks });
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
*/
    componentDidUpdate(prevProps, prevState) {
        if (prevState.todoList.length !== this.state.todoList.length) {
            console.log("TodoList has been updated, new item added or deleted");
        }
    }

    handleInputChange = (e) => {
        this.setState({ newItemText: e.target.value });
    }

    addItem = () => {
        const { newItemText } = this.state;
        addTask(newItemText)
            .then(newTask => {
                this.setState(prevState => ({
                    todoList: [...prevState.todoList, { ...newTask, title: newTask.description }],
                    newItemText: '',
                    showAddItemInput: false
                }));
            })
            .catch(error => {
                console.error('There has been a problem with your add operation:', error);
            });
    }

    deleteItem = (id) => {
        deleteTask(id)
            .then(() => {
                const filteredItems = this.state.todoList.filter(item => item.id !== id);
                this.setState({ todoList: filteredItems });
            })
            .catch(error => {
                console.error('There has been a problem with your delete operation:', error);
            });
    }

    renderItems = () => {
        return this.state.todoList.map(item => (
            <TodoItem
                key={item.id}
                id={item.id}
                title={item.title}
                completed={item.completed}
                onDelete={this.deleteItem}
            />
        ));
    }

    render() {
        const { showAddItemInput, newItemText } = this.state;

        return (
            <main className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-10 mt-4 mx-auto p-0">
                        <div className="card p-3">
                            <div className="mb-4">
                                {showAddItemInput ? (
                                    <>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={newItemText}
                                            onChange={this.handleInputChange}
                                            placeholder="Enter task description"
                                        />
                                        <button className="btn btn-success" onClick={this.addItem}>
                                            Submit
                                        </button>
                                        <button
                                            className="btn btn-secondary ml-2"
                                            onClick={() => this.setState({ showAddItemInput: false })}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => this.setState({ showAddItemInput: true })}
                                    >
                                        Add task
                                    </button>
                                )}
                            </div>
                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

// when you use export default you can import with import AnyNameyouWant from './TodoList.js';
export default TodoList;
