import './Navdropdown.css'

function NavdropdownColumn(props) {
    
    var title = null;
    if( props.title != null )   title = (<div className="nav-col-title">{props.title}</div>)
    
    // TODO Change <a href> to <links>
    var renderArray = [];
    props.links.forEach(link => {
        renderArray.push(<a className="nav-col-element" href={link.href}>{link.title}</a>)
    });

    return(
        <div className="nav-col">
            {title}
            {renderArray}
        </div>
    )
}

function Navdropdown(props) {
    
    var renderArray = [];
    props.options.forEach(
        element => {
            renderArray.push(<NavdropdownColumn title={element.title} links={element.links}/>);
    });
    
    return(
        <div className="navdropdown">
            {renderArray}
        </div>
    );
}

export default Navdropdown;