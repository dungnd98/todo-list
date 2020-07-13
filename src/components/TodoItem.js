import React, { Component } from 'react';
import './TodoItem.css';
import classNames from 'classnames';
import checkImg from '../img/check.svg';
import checkCompleteImg from '../img/check-complete.svg';
import multiply from '../img/multiply.svg';

class TodoItem extends Component {

    render() {
        const {item, onClickCheck, onClickDelete, onEdit, doneEdit} = this.props;
        let url = checkImg;
        if(item.isComplete) {
            url = checkCompleteImg;
        }
        return ( 
            <div className={classNames('TodoItem', {
                'TodoItem-complete': item.isComplete
            })}>
                <img onClick={onClickCheck} src={url} width={32} />
                {
                    !item.isEdit && <p onDoubleClick={onEdit} >
                    {this.props.item.title}</p>
                }
                {
                    item.isEdit && <input type="text" autoFocus
                    defaultValue={item.title}
                    onKeyUp={doneEdit}
                    />
                }
                <img onClick={onClickDelete} className="Delete" src={multiply} width={12} />
            </div>
        );
    }
}   

export default TodoItem;