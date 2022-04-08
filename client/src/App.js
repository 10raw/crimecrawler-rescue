import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

function App() {

  const [data,setData]=useState([]);
  async function getdata(e){
    e.preventDefault();
    console.log("h")
    try{
      await axios.get('http://localhost:8000/feed')
      .then((resdata)=>{
        console.log(resdata)
      })
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
   
    // getdata()
    console.log("o")
  }, []);
  
 
  return (
    
    <div className="App">
     <button onClick={getdata}>Ok</button>
    </div>
  );
}

export default App;
