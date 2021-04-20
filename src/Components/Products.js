import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import postdata from '../data/data.json'
import axios from 'axios'
const PAGE_PRODUCTS='products'
const PAGE_CART='cart'
let obj1=
{
    // padding: '90px'
    margginLeft: '20px',
    marginTop: '90px'
}

let obj2=
{
    marginTop: '90px',
    marginRight: '90px'
}
let obj3=
{
    marginTop: '-10px'
}
// let btn=
// {
//    backgroundColor:'#ed9220'
// }
function Products(props) {
 
    const [cart, setCart] = useState([])
    const [page, setPage] = useState(PAGE_PRODUCTS)
    const [currentid, setCurrentid] = useState('')
    const [user, setUser] = useState('')
    // const [email, setemail] = useState('')
    // const [pass, setpass] = useState('')
    // const {isLogedIn,changeLogin,name,setLoginPerson}=useContext(LoginContext)

    // const[ isLoggedIn ,setIsLoggedIn]= useState('')
    // const [data, setdata] = useState([])
    // const disp=()=>{
    //     alert("hi")
    //         axios.get('http://localhost:3001/product').then(res=>{
    //             console.log(res.data)
    //           setdata(res.data);
    //         }).catch(err=>console.log(err))
    // }

    let Active = JSON.parse(sessionStorage.getItem('ActiveUser'))

    const clickHandler=(product)=>
    {
       
        alert("clicked"+product.id+" "+product.title)
        console.log("we are in cart")
        setCart([...cart,{...product,qty:1}])
      let arr=  JSON.parse(localStorage.getItem("productData")) 
      if(arr==null){
          arr={}
      }
      let obj = { id:product.id,title:product.title, price:product.price}
      arr=obj;
      localStorage.setItem('productData', JSON.stringify(arr))
     
    }
    const removeFromCart=(ProdcutToRemove)=>
    {
        setCart(cart.filter(product=>product!==ProdcutToRemove))
    }
    const onAdd=(i)=>
    {
    const exist=cart.find(x=>x.id===i.id);
    console.log(exist);
    if(exist)
    {
        setCart(cart.map(x=>x.id===i.id ?{...exist,qty:exist.qty+1} :x))
    }else{
        setCart([...cart,{...i,qty:1}])
    }
        
    }

    const onRemove=(i)=>
    {
        // alert("remove")
        const exist=cart.find((x)=>x.id===i.id);
        if(exist.qty===1)
        {
            setCart(cart.filter((x)=>x.id!==i.id))
        }
        else
        {
        setCart(cart.map(x=>x.id===i.id ?{...exist,qty:exist.qty-1} :x))

        }
    }
    const navigateTo=(nextPage)=>
    {
        console.log(nextPage.id)
        setPage(nextPage)
    }
    const dispalyProduct=()=>
    (
        postdata.map((p,i)=>{
       
            return <div className="row">
                <img src={p.src} className="col"/>
                <div className="col"  style={obj1}>{p.title} </div>
                <div className="col"  style={obj1}>${p.price}</div>
                <div className="col cartbtn">
                <button className="btn btn-info" style={obj3} onClick={()=>clickHandler(p)}>add to cart</button>
                </div>
                </div>
                
        })
      
    )

    const renderCart=()=>
    (
        cart.map((p,i)=>{
       
            return <div className="row" key={i.id}>
                <img src={p.src} className="col" />
                <div  className="cartbtn col">
                <button className="btn btn-danger" style={obj3} onClick={()=>removeFromCart(p)}>remove</button></div>
                <div  className="col" style={obj1}>
                <button className="btn btn-secondary btn-sm" onClick={()=>onAdd(p)}>+</button>&nbsp;
                <button className="btn btn-secondary btn-sm" onClick={()=>onRemove(p)}>-</button>
                {/* </div>
                <div style={obj1}> */}
                {p.qty} X ${p.price} 
                </div>
                <p className="col"  style={obj2}>Total:${p.price*p.qty}</p>
                <p className="col"  style={obj1}>{p.title} </p>
                <p className="col"  style={obj1}>${p.price}</p>
              
                </div>
        

        })
       
    )
    const confimOrder=()=>
    {
        let t=0;
        let id=Active.id
    if(Active.id!=null)
    {
  
     console.log("id id "+id)
        let myCart=cart.map(product=> {
            return {title:product.title}
                 } )
       
    for(let i=0;i<cart.length;i++)
    {
    t=t+cart[i].qty*parseInt(cart[i].price);
    console.log(t);
    }
        var data=JSON.stringify(myCart)
        axios.post('http://localhost:3001/data',{id:id,myCart:data,t:t,user:user}).then((res)=>
        {
            console.log(res)
           
        }).catch(res=>
            {
                console.log(res.data)
            })
            alert(`hi ${Active.Username} your order successfull... your total price is ${t}`);
            props.history.push('/');
            window.location.reload();

    }
    else
    {
        alert("please login first")
        props.history.push('Login');
        window.location.reload();
        
    }
               
    }



   const login=()=>
   {
    // alert("login")
    props.history.push('/login')

   }
 const allHistory=()=>
 {
     alert("history")
     props.history.push('/history')
 }
    return (
     
      
        <div className>
             {/* <h5>all products </h5>  */}
           
             <header className="b">
            <button className="btn btn-secondary" onClick={()=>navigateTo(PAGE_CART)} >Go to cart ({cart.length})</button>&nbsp;&nbsp;&nbsp;
            {/* <Link to="/cartData">Go to cart ({cart.length}) </Link> */}
             <button className="btn btn-secondary" onClick={()=>navigateTo(PAGE_PRODUCTS)} >View Prodcuts</button>&nbsp;&nbsp;&nbsp;  
             {/* <button className="btn btn-secondary" onClick={allHistory}>History</button> */}

             <h4>welcome {Active.Username}</h4>
             {page==PAGE_CART.length ?<button className="btn btn-secondary" onClick={login}>Login</button>:null}
              {/* <button><Link to="/login">Login</Link> </button> */}
             </header>
             {/* <h4>Products</h4> */}
             <div>
             {/* {
           postdata.map((p,i)=>{
          
               return <div className="row">
                   <img src={p.src} className="col"/>
                   <div className="cartbtn"><button onClick={clickHandler}>add to cart</button></div>
                   <p className="col"  style={obj1}>{p.title} </p>
                   <p className="col"  style={obj1}>{p.price}</p>
                  
                   </div>

                   
           })
       }  */}
          
            {page===PAGE_PRODUCTS &&  dispalyProduct()}
            {page===PAGE_CART && renderCart()}
            {page==PAGE_CART ?<button className="btn btn-success" onClick={confimOrder}>order confirm</button>:null}
             </div>
       
        {/* <button className="btn btn-dark">Add to Cart</button> */}
      
       {/* <div>
         <button onClick={disp}>display</button>
      </div> 
      
          {
              data.map((v,i)=>
              <table border='2px black'>
                  {
                      <tr key={v.pid}>
                          <td>{v.name}</td>
                          <td>{v.price}</td>
                          <td><button>add to cart</button></td>
                      </tr>
                  }

                  </table>
                  
                  )
          } */}
         
        </div>

           
      
    )
}

export default Products
