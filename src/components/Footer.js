import React, { Component } from 'react';
import './Footer.css'
import classNames from 'classnames';
class Footer extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }
    render() {
        const { cout, todosComplete,
                onClickComplete, onClickAll,
                onClickActive, onClickDone, 
                filter} = this.props;
        return (
            <div className="Footer">
                <div className="cout">{cout} item</div>
                <div className="button">
                    <button onClick={onClickAll} className={classNames({'active': filter === 'all'})} >All</button>
                    <button onClick={onClickActive} className={classNames({'active': filter === 'active'})}>Active</button>
                    <button onClick={onClickDone} className={classNames({'active': filter === 'complete'})}>Complete</button>
                </div>
                {
                    todosComplete > 0 &&
                    <div>
                        <button onClick={onClickComplete} >Clear Complete</button>
                    </div>
                }
            </div>
        );
    }
}
export default Footer;