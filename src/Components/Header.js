import React,{useState} from 'react'
import { BrowserRouter,NavLink,Link, Route, Switch } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import SignUp from './SingUp'
import Products from './Products';
import Admin from './Admin';
import Logout from './Logout';
import AddProduct from './AddProduct';
import AllCart from './AllCart';
import History from './History';


function Header() {
  // const [click, setclick] = useState(true)
 const [cart, setCart] = useState(0)
  let Active = JSON.parse(sessionStorage.getItem('ActiveUser'))
  if (Active == null) {
    Active = { Status: false }
    sessionStorage.setItem('ActiveUser', JSON.stringify(Active))
  }
    return (
    
        <div>
<BrowserRouter>
{/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Online Shopping</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ">
      <li class="nav-item active">
         <NavLink class="nav-link"  exact to="/">Home <span class="sr-only">(current)</span></NavLink> 
       </li>
      <li class="nav-item">
        <NavLink class="nav-link" to="/product">Products</NavLink>
      </li>
      <li class="nav-item">
      <NavLink class="nav-link" to="">About us</NavLink>
      </li>
      <li class="nav-item">
      <NavLink class="nav-link" to="/login">Login</NavLink>
      </li>

    <li class="nav-item">
    <NavLink class="nav-link" to="/signup" >SignUp</NavLink>
</li>
    </ul>
  </div>
</nav> */}

<nav class="navbar navbar-expand-md navbar-light bg-light">
    <a class="navbar-brand" href="#">Online Shopping</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto ">
            <li class="nav-item active">
            <Link class="nav-link"  exact to="/">Home <span class="sr-only">(current)</span></Link> 
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/product" >Products </Link>
            </li>
            {/* <li class="nav-item">
            <Link class="nav-link" to="/">About us</Link>
            </li> */}
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item">
            {/* <Link class="nav-link" to="/login">Login</Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/signup" >SignUp</Link> */}
            </li>

            {
              Active.Status ? <>
              <Link class="nav-link" to="/logout">Logout </Link> 
             {Active.Email=="admin@gmail.com"?null: <Link class="nav-link" to="/history">History</Link>}
              {/* <Link class="nav-link" to="/cartData">Go to Cart ({cart.length})</Link> */}
              </>:
                <><Link class="nav-link"  to="/login">Login </Link>
                  <Link class="nav-link" to="/signup">Sign Up</Link>
                  </>
               
            }
        </ul>
    </div>
</nav>


<Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/login" exact component={Login}/>
    <Route path="/logout" exact component={Logout}/>
    <Route path="/signup" exact component={SignUp}/>
   <Route path="/product" exact component={Products}/>
   <Route path="/admin" exact component={Admin}/>
   <Route path="/addProduct" exact component={AddProduct}/>
   <Route path="/allCart" exact component={AllCart}/>
   <Route path="/history" exact component={History}/>


</Switch>
</BrowserRouter>  
        </div>
    )
}

export default Header
