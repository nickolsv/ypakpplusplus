import './Navdropdown.css'

function Navdropdown(props) {
    
    var resultArray = [];
    props.options.forEach(
        element => {
            var result = <div className="navdropdown-item">{element}</div>
            resultArray.push(result);
    });
    
    return(
        <div className="navdropdown">
            {resultArray}
        </div>
    );
}

export default Navdropdown;