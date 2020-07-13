import React, { Component } from 'react';
import './Footer.css'
class Footer extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }
    render() { 
        const {cout, item} = this.props;
        return ( 
            <div className="Footer">
                <div className="cout">{cout} item</div>
                <div className ="button">
                    <button>All</button>
                    <button>Active</button>
                    <button>Complete</button>
                </div>
                <div>
                    <button>Clear Complete</button>
                </div>
            </div>
        );
    }
}
export default Footer;