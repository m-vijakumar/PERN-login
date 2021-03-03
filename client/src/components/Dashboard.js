import React, { useEffect ,useState} from 'react'
// import {Link ,withRouter } from 'react-router-dom'
import Header from './Header'
import "./../App.css"
export default  function Dashboard(props) {

    // const [userData,setUserData]=useState({});
    const [isSpinner,setSpinner]=useState(true);

   const userlog= async ()=>{

    try{
    const resp = await fetch("/dashboard");
    const data = await resp.json();
         if(data.success === false){
            props.history.push("/login");
         }
    }catch(e){
        console.log(e);
        props.history.push("/login");
    }
    }

    useEffect(()=>{
        console.log("sssss")
        userlog();
        setSpinner(false)
    },[])
    if (isSpinner) {
        return (
          <div className="spinner-border " role="status" id="spinner">
          <span className="sr-only">Loading...</span>
          </div> 
        )
    }else{
    return (
        <div>
        <Header />
        <div className="App">
        
            <h1>Welcome</h1>
        </div>
        </div>
        
    )
    }
}
