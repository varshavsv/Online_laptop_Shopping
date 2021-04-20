import React,{useEffect} from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect, useHistory } from 'react-router-dom'
function Logout() {
    let history = useHistory()
    sessionStorage.removeItem("ActiveUser");
    let Active = JSON.parse(sessionStorage.getItem('ActiveUser'))
    if (Active == null) {
        Active = { Status: false }
        sessionStorage.setItem('ActiveUser', JSON.stringify(Active))
    }

    useEffect(()=>{
        window.location.reload()
      },[])

    return (
        <div>
           
            {/* {history.push('/')} */}
            <Redirect to='/' />
        </div>
    )
}

export default Logout
