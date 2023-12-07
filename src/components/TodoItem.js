import React from "react";

function TodoItem(props) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {props.completed ? <s>{props.title}</s> : props.title}
            <button className="btn btn-danger" onClick={() => props.onDelete(props.id)}>
                Delete
            </button>
        </li>
    );
}

export default TodoItem;