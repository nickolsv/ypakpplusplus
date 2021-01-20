import './Navdropdown.css'
import { Link } from 'react-router-dom'
import React, { Component } from 'react';


function NavdropdownColumn(props) {
    
    var title = null;
    if( props.title != null )   title = (<div className="nav-col-title">{props.title}</div>)
    
    var renderArray = [];
    props.links.forEach(link => {
        var pushElem =  <div onClick={props.closeDrop} className="nav-col-element">
                            {link.icon}
                            {link.title}
                        </div>;
        if( link.href !== "")
            pushElem = (<Link onClick={props.closeDrop} className="nav-col-element" to={link.href}>
                            {link.icon}
                            {link.title}
                        </Link>)
        renderArray.push(pushElem)
    });


    return(
        <div className="nav-col">
            {title}
            {renderArray}
        </div>
    )
}

class Navdropdown extends Component {
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if( this.node.contains(e.target))
        {
            return;
        }

        this.props.closeDrop()
    }


    render()
    {
        var renderArray = [];
        this.props.options.forEach(
            element => {
                renderArray.push(<NavdropdownColumn closeDrop={this.props.closeDrop} title={element.title} links={element.links}/>);
        });
        
        return(
            <div className="navdropdown" ref={node => this.node = node}>
                {renderArray}
            </div>
        );
    }

}

export default Navdropdown;