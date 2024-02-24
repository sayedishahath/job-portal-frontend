import Register from "./RegisterComp";
import Login from "./LoginComp";
import JobForm from "./JobForm";
import AllJobs from "./AllJobs";
import MyJobs from "./myJobs";
// import axios from 'axios'
import { useState } from "react"
function App() {
const [userLoggedIn,setUserLoggedIn] =useState(false)  

const loginSuccess=()=>{
  setUserLoggedIn(true)
}
const logout =()=>{
  const confirmation = window.confirm('are you sure?')
  if (confirmation){
    setUserLoggedIn(false)
    localStorage.removeItem('token')
  }
}
  return (
    <div>
      <h1>job portal App</h1>
      <hr/>
      <AllJobs />
      {userLoggedIn?
      
      <div>
        <button onClick={logout}>Logout</button>
        <JobForm/>
        <MyJobs/>
      </div> : 
      <div>
        <Register />
        <Login loginSuccess={loginSuccess}/>
      </div>
      }
    </div>
  );
}

export default App;
