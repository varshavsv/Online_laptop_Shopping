import React,{Link} from 'react';
import { NavLink } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

function SingUp(props) {
    const [uname, setUname] = useState('')
    const [email, setEmail] = useState('')
    const [pass,setPass ] = useState('')
    const [cpass, setCpass] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const register=(e)=>
    {
         e.preventDefault();
         if(uname.length==" " || email.length==" " || pass.length==" " || cpass.length ==" " || mobile.length==" " || address.length=="")
         {
            //  alert("Enter all fileds")
             setError("Enter All Fileds");
         }
         else if(email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/))
         {
            // <span style={obj}>{value}</span>
            // alert("Enter valid email")
            setValue("Enter Valid Email")
         }
         else
         {
            if(pass==cpass)
            {
               axios.post('http://localhost:3001/register',{uname,email,pass,cpass,mobile,address}).then(res=>console.log(res))
               // setValue("Registered succssfully")
               alert("Registered succssfully");
               props.history.push('/login');
            }
            else
            {
               //  alert("password and confirm password should same");
               setValue("password and confirm password should same");
            }
         }
         
         setUname('');
         setEmail('');
         setPass('');
         setCpass('');
         setMobile('');
         setAddress('');
    }
  const obj={  color:'red'}
    return (
        <div className="container">
            <div className="outer">
      <div className="inner">
            <h3>Register</h3>
           <form>
               <div className="form-group">
                <label>Enter Name</label>
                <input type="text" value={uname}  onChange={(e)=>setUname(e.target.value)} className="form-control" placeholder="Enter Name"/>
               </div>
               <div className="form-group">
                <label>Enter Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Email"/>
               </div>
               <div className="form-group">
                   <label>Enter Password</label>
                <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} className="form-control" placeholder="Enter Password"/>
               </div>
               <div className="form-group">
                   <label>Confirm-Password </label>
                <input type="password" value={cpass}  onChange={(e)=>setCpass(e.target.value)} className="form-control" placeholder="Confirm Password"/>
                <span style={obj}>{value}</span>
               </div>
               <div className="form-group">
                   <label>Enter Mobile Number</label>
                <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} className="form-control" placeholder="Enter Mobile Number"/>
               </div>
               <div className="form-group">
                   <label>Enter Address</label>
                <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" placeholder="Enter Address"/>
               </div>
               <div>
               <button className="btn btn-dark btn-lg btn-block" onClick={register}>submit</button>
             <center>  <span style={obj}>{error}</span></center>
               </div>
           </form>
        </div>
        </div>
        </div>
    )
}

export default SingUp
