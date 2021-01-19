
async function uploadFile(name, endPoint)
{
    let formData = new FormData(); 
    formData.append("file", name.files[0]);
    console.log("test")
    await fetch(endPoint, {
      method: "POST", 
      body: formData
    }); 
}

function AttachDocs(props) {

    var resultArray = []

    props.uploadDetails.forEach(element => {
        var name = element.name;
        var endPoint = element.endPoint;
        resultArray.push( <input id={"fileupload" + name} type="file" name={name} /> );
        resultArray.push( <button id="upload-button" onclick={ () => uploadFile(name, endPoint)}> Upload </button> );
    });

    return(
        <div>
            {resultArray}
        </div>
    )
}

export default AttachDocs;