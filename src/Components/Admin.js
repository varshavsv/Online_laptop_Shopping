import React,{useState,useEffect} from 'react'
import axios from 'axios';


function Admin(props) { 
    const [data, setdata] = useState([])
   
    const order=() => {
        alert("hi")
        props.history.push('/allCart')
    }


    const add=()=>
    {
        alert("in add");
     props.history.push('/addProduct')
    }

    // const allProdcuts=()=>
    // {
    //     props.history.push('/allProducts')
    // }
    
    return (
        <div className="container">
        
            <h3>Welcome Admin</h3>
                <button className="btn btn-info btn-sm" onClick={add}>Add product</button>&nbsp;&nbsp;
                {/* <button className="col btn btn-info btn-sm">Remove product</button>&nbsp;&nbsp; */}
                <button className="btn btn-info btn-sm" onClick={order}>All order</button>&nbsp;&nbsp;
                {/* <button className="col btn btn-info btn-sm" onClick={allProdcuts}>All Products</button> */}
           
                 

                   
        </div>
    )
}

export default Admin
