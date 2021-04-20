import React, { useState, useEffect } from "react";
import axios from "axios";
function AllCart() {
  const [allProducts, setAllProducts] = useState([]);
  const [prodcuts, setprodcuts] = useState([]);
  // const [deleteid, setDeleteid] = useState('')
  // const [name, setname] = useState('')
  // const [price, setprice] = useState('')
  useEffect(() => {
    // alert("all prodcuts")
    fetchData();
  }, []);
  const fetchData = () => {
    //   alert("hi")
    axios
      .get("http://localhost:3001/cartData")
      .then((res) => {
        // console.log(res.data)
        let arr = res.data;
        console.log(arr);
        setAllProducts(arr);
      })
      .catch((err) => console.log(err));
  };
  //   const  deleteProduct=(id)=>
  //    {
  //        alert("delete ")
  //     axios.delete('http://localhost:3001/delete',[id]).then(res=>{
  //     console.log(res.data)
  //     setDeleteid(res.data)
  //     })
  //    }

  //    const editProduct=()=>{
  //     alert("edit ")
  //     axios.put('http://localhost:3001/update',{name:name,price:price}).then(res=>{
  //     console.log(res.data)
  //     setname(res.data)
  //     setprice(res.data)
  //    })
  //    }
  return(
// console.log()
  <div className="container">
        <table className="table table-striped">
                  <tr>
                      <th> cart id</th>
                      <th> Prodcuts</th>
                      <th>Total</th>
                      {/* <th>Date</th> */}
                  </tr>
                  <tbody>
                      {/* {
                          
                          console.log(allProducts)
                      } */}
          {
             allProducts.length>0?
             allProducts.map((v,i)=>
             {
                 const {cartid,total,prodcuts}=v
                 const arr= JSON.parse(prodcuts);
                 return(
                     <tr key={i}>
                     <td>{cartid}</td>
                     {/* <td>{arr.map((value)=>    <div> {value.title}   </div> )           }</td> */}
                     <td><tr>{arr.map((value)=>    <td> {value.title}   </td> )           }</tr></td>
                     {/* <td>{v.prodcuts}</td> */}
                     <td>{total}</td>
                     {/* <td>{v.orderDate}</td> */}
                 </tr>
                 )
             }):(
                 <tr>
                     <td  colSpan={3}>No Products</td>
                 </tr>
             )
}

                  </tbody>
              </table>
  </div>

  )
}
export default AllCart;
