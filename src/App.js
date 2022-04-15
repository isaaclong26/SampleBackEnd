import logo from './logo.svg';
import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function importAll(r) {
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}
const images = importAll(require.context('./photos', false, /\.(png|jpe?g|svg)$/));

function DisplaySearchResults(data){
function addInventory(id){

  fetch(`https://samples-node.herokuapp.com//addInventory/${id}`)
}
function subtractInventory(id){
  fetch(`https://samples-node.herokuapp.com//subtractInventory/${id}`)
}
  let samples = data.data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCopy = (x) => {
    console.log(x)
      let ots = `
        Name: ${x.name}
        Location: ${x.location}
        Die: ${x.die}
        Finish: ${x.finish}
        
      `
    navigator.clipboard.writeText(ots)

  }

  return(
    <>


      {samples && samples.map(sample=>

        <div className="sampleDis container" id={sample.name}>
          <div className="row">
          <div className="col-lg-3 sampleImageDiv">

            { images[`${sample.name}.jpg`] !== undefined &&
            <img className="sampleImage" src={images[`${sample.name}.jpg`]} alt={sample.name}></img>
              }
          { images[`${sample.name}.jpg`] === undefined &&
           <img className="sampleImage" src={images[`2603.jpg`]} alt={sample.name}></img>
            }
          </div>
          <div className="col-lg-6 sampleDetails"> 
          
          <ul id="sampleDetailsList">
              <li className="sampleDetailItem"><h3 className="text-left">Name:</h3>{sample.name}</li>
              <li className="sampleDetailItem"><h3>Location: </h3>{sample.location}</li>
              <li className="sampleDetailItem"><h3>Inventory: </h3>{sample.inventory}</li>
              <li className="sampleDetailItem"><h3>Finish: </h3>{sample.finish}</li>
              <li className="sampleDetailItem"><h3>Die: </h3>{sample.die}</li>
            </ul>
         </div>
        <div className="sampleControls col-lg-3">
        <Button  onClick={handleShow}>Order</Button>
        <Button value={sample._id} onClick={e => addInventory(e.target.value)}>Add</Button>
        <Button value={sample._id} onClick={e => subtractInventory(e.target.value)}>Subtract</Button>
        <Button  value={sample} onClick={e => {handleCopy(sample)}}>Copy Label</Button>
        <Modal 
        show={show}
         onHide={handleClose}
          size={'xl'}
           centered 
            fullscreen={false}
            dialogClassName="modal-90w sampleOrder "
            backdrop={false}
          
          >
        <Modal.Header closeButton>
          <Modal.Title>Request Sample</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul id="sampleDetailsList">
              <li className="sampleDetailItem"><h3 className="text-left">Name:</h3>{sample.name}</li>
              <li className="sampleDetailItem"><h3>Location: </h3>{sample.location}</li>
              <li className="sampleDetailItem"><h3>Inventory: </h3>{sample.inventory}</li>
              <li className="sampleDetailItem"><h3>Finish: </h3>{sample.finish}</li>
              <li className="sampleDetailItem"><h3>Die: </h3>{sample.die}</li>
            </ul>
          

            
            


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


        </div>




          </div>

        </div>

      )}
    
    
    </>

  )


}


function DisplayRequests(data){

return(
  <>Projects</>
)
}

function App() {
  const [cats, setCats] = useState([]);
  const [products, setProducts] = useState([]);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true)
  const [newCatName, setNewCatName] = useState()
  const [newProductName, setNewProductName] = useState()
  const [newProductCat, setNewProductCat] = useState()
  const [newSampleName, setNewSampleName] = useState()
  const [newSampleProduct, setNewSampleProduct] = useState()
  const [newSampleCount, setNewSampleCount] = useState()
  const [newSampleImage, setNewSampleImage] = useState()
  const [newSampleFinish, setNewSampleFinish] = useState()
  const [newSampleLocation, setNewSampleLocation] = useState()
  const [newSampleDie, setNewSampleDie] = useState()
  const [searchTerm, setSearchTerm] = useState()
  const [searchField, setSearchField] = useState()
  const [searchResults, setSearchResults] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [sampleList, setSampleList] = useState([])
  const [fuseOptions, setFuseOptions] = useState({keys: ["location", "name", "finish"]})
  const [requests, setRequests] = useState([])

function handleSearchFieldChange(e) {
  setSearchField(e.target.value);


}
function addProject(){
  
  let ots = {
    name: newProductName,
   
  }

  fetch(`https://samples-node.herokuapp.com//addProduct/${newProductCat}`, {method: 'POST', Mode: "no-cors", body: JSON.stringify(ots) ,headers: {
    'Content-type': 'application/json; charset=UTF-8'
}})


};
function addCat(){
  let ots = {
    name: newCatName
  
  }
  fetch("https://samples-node.herokuapp.com//addCat", {method: 'POST', Mode: "no-cors", body: JSON.stringify(ots),headers: {
    'Content-type': 'application/json; charset=UTF-8'}})

};

 function search(){
  let field = searchField
  let term = searchTerm

  fetch(`https://samples-node.herokuapp.com//search/${field}/${term}`)
  .then(response => response.json())
  .then(data => {
    setSearchResults(data)
    
  })



}
function addSample(){
  let ots = {
    name: newSampleName,
    finish: newSampleFinish,
    image: newSampleImage,
    location: newSampleLocation,
    die: newSampleDie,
    inventory: newSampleCount,
    
  }
  fetch(`https://samples-node.herokuapp.com//addSample/${newSampleProduct}`, {method: 'POST', Mode: "no-cors", body: JSON.stringify(ots),headers: {
    'Content-type': 'application/json; charset=UTF-8'}})
};
const handleOnSearch = (string, results) => {
  // onSearch will have as the first callback parameter
  // the string searched and for the second the results.
  setSearchResults( results)

}

const handleOnHover = (result) => {
  // the item hovered
}

const handleOnSelect = (item) => {
  // the item selected
}

const handleOnFocus = () => {
}
const formatResult = (item) => {
  return (
    <>
      <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
    </>
  )
}

useEffect(()=>{

  const bootstrapasyc = async()=>{
  fetch("https://samples-node.herokuapp.com//cats",{Method: 'GET', Mode: "no-cors"})
  .then(res => res.json())
  .then(data => setCats(data))
  
  fetch("https://samples-node.herokuapp.com//products",{Method: 'GET', Mode: "no-cors"})
  .then(res => res.json())
  .then(data => setProducts(data))

  fetch("https://samples-node.herokuapp.com//allRequests",{Method: 'GET', Mode: "no-cors"})
  .then(res => res.json())
  .then(data => setRequests(data))

  fetch("https://samples-node.herokuapp.com//samples",{Method: 'GET', Mode: "no-cors"})
  .then(res => res.json())
  .then(data => {
    
    setSamples(data)
    let x = 0
    for(x in data){
      setSampleList(sampleList.push(data[x].name))
    } 
  })
  

  setLoading(false)
  }
  





   bootstrapasyc();
  

},[])







  return (
    <div className="container-fluid">

      <div className="row">

        <div className="col-lg-12" id="header">
           Samples
        </div>

      </div>

      <div className="row mb-5">
  
            <div className="col-lg-4 toolBar">

                <Button className="addBtn" onClick={function(){addCat()}}>
                  Add Category
                  </Button>
                  <input onChange={e => setNewCatName(e.target.value)} id="newCatName" placeholder="Name"></input>
            </div>

            <div className="col-lg-4 toolBar">

            <Button className="addBtn" onClick={function(){addProject()}}>Add Product</Button>
            <input onChange={e => setNewProductName(e.target.value)}id="newProductName" className='addProduct' placeholder="Name" >
                </input>
                <input onChange={e => setNewProductCat(e.target.value)}id="newProductCat" className='addProduct'placeholder="Category"></input>
            </div>


            <div className="col-lg-4 toolBar">

                  <Button className="addBtn" onClick={function(){addSample()}}>
                    Add Sample
                    </Button>
                    <input onChange={e => setNewSampleName(e.target.value)}id="newSampleName" className='addSample' placeholder="Name"></input>
                    <input onChange={e => setNewSampleCount(e.target.value)}id="newSampleCount" className='addSample'placeholder="Inventory"></input>
                    <input onChange={e => setNewSampleProduct(e.target.value)} id="newSampleProduct" className='addSample' placeholder="Product"></input>
                    <input onChange={e => setNewSampleImage(e.target.value)} id="newSampleImage" className='addSample' placeholder="Image Url"></input>
                    <input onChange={e => setNewSampleFinish(e.target.value)} id="newSampleFinish" className='addSample' placeholder="Finish"></input>
                    <input onChange={e => setNewSampleLocation(e.target.value)} id="newSampleLocation" className='addSample' placeholder="Location"></input>
                    <input onChange={e => setNewSampleDie(e.target.value)} id="newSampleDie" className='addSample' placeholder="Die Number"></input>
             </div>

      
    
        </div>
       
        
        <div className="row">
              <div className="col-lg-6">
                <h2>Requests</h2>
                <DisplayRequests></DisplayRequests>
                </div>

         
              
     
        
  


        <div id="search" className="col-lg-6">
            <h2>Search</h2>
            <ReactSearchAutocomplete
                items={samples}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                formatResult={formatResult}
                fuseOptions={fuseOptions}
                maxResults = {50}
              />
            <DisplaySearchResults data={searchResults}></DisplaySearchResults>
        </div>

        </div>
     





     
    </div>


  );
            }


export default App;
