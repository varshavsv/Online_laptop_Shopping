import React,{useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
// import { LoginContext } from '../context/LoginContext';

function Login(props) {
    let flag = false;
    let Id = null;
    let member="";
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const[ isLoggedIn ,setIsLoggedIn]= useState('')
    const [error, seterror] = useState('')
    const [value, setValue] = useState('')
    // const {changeLogin,setLoginPerson}=useContext(LoginContext)

    const [user, setUser] = useState([])
    // const [value, setValue] = useState('')
    useEffect(() => {
        axios.get("http://localhost:3001/user").then(res=>{
            console.log(res)
            setUser(res.data)
        }).catch(err=>{
            console.log(err)
        })
      
    },[])
  
    const login=(e)=>
    {
        e.preventDefault();
        user.map((u, i) => {
            if (u.email == email && u.password == pass) {
                Id = u.idsignup
                member= u.username
                flag = true
            }
            console.log("ID "+Id)
           
        })
        // e.preventDefault();
            let Active = JSON.parse(sessionStorage.getItem('ActiveUser'))
            if (Active == null) {
                Active = {}
            }
            let obj = { id: Id,Username:member, Email: email, Password: pass, Status: true }
            Active = obj
            sessionStorage.setItem('ActiveUser', JSON.stringify(Active))
            if(email.length=="" || pass.length=="")
            {
               // alert("Enter email and password")
                setValue("Enter email and password")
            }
            else if(email=="admin@gmail.com" && pass=="admin")
            {
                alert("Welcome Admin")
                props.history.push('/admin')
                window.location.reload()
            }
            
            else
            {
           
                axios.post('http://localhost:3001/login',{email:email,password:pass}).then((res)=>
                {
                    if(res.data.message)
                    {
                    //    setIsLoggedIn(res.data.message)
                        setValue(res.data.message);
                       
                    }
                    else
                    {
                        setIsLoggedIn(res.data[0].username)
                        console.log(res.data[0].username)
                        // changeLogin();
                        props.history.push('/Product')
                        window.location.reload()
                        
                     }
                    
                })
               
            }
           
            setEmail('');
            setPass('');
    }
  
    const obj={  color:'red'}
    return (
        <div className="container">
              <div className="outer">
      <div className="inner">
            <h3>Login</h3>
           <form>
               <div className="form-group"> 
                   <label>Enter Username</label>
                <input type="text" id="username" className="form-control" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
               </div>
               <div className="form-group">
                   <label>Enter Password</label>
                <input type="password" id="password" className="form-control" placeholder="Enter Password" onChange={(e)=>setPass(e.target.value)} />
                <span style={obj}>{value}</span>
               </div>
               <div>
                   <button className="btn btn-dark btn-lg btn-block" onClick={login}>Login</button>
               </div>
               <div>
           <Link to="/signup">need an account? click here</Link> 
           </div>
           </form> 
           <h3>{isLoggedIn}</h3>
          
         
           </div>
           </div>
     
        </div>
    )
}

export default Login
