import React from 'react';
import {render} from 'react-dom';
import Blog from "./Components/blog.jsx";

class App extends React.Component {
    render () {
        return (
            <ul>

            </ul>
        )
    }
}
class Other extends React.Component{
    render(){
        return (
            <li>
                {this.props.data}
            </li>
        )
    }
}


render(<Blog/>, document.getElementById('blog'));

if (module.hot) {
    module.hot.accept();
}
