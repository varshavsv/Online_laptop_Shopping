import React,{useState,useEffect, Children} from 'react'
import axios from 'axios';
function History() {
    const [id, setid] = useState('')
    const [data, setdata] = useState([])
    let Active = JSON.parse(sessionStorage.getItem('ActiveUser'))
    useEffect(() => {
        fetchData()
      
    },[]);

 const fetchData=()=>
   {
     
    let id=Active.id
       if(Active.id!=null)
        {
        console.log("logged id is "+id)
        axios
        .get(`http://localhost:3001/history/${id}`)
        .then((res)=>{
        let arr=res.data;
        console.log("all data"+arr)
        setdata(arr)
        })
        .catch(err=>console.log(err))
        }

    else{
        console.log("nooo")
    }
   }

    return (
        <div>
            <h2>Your history</h2>
           
            <table className="table table-striped"> 
                        <tr>
                            <th> cart id</th>
                            <th> Product Title</th>
                            <th>Product Price</th>
                            {/* <th>Product Image</th> */}
                        </tr>
                        <tbody> 
                        {
                            console.log(data)
                        }

                {
                    data.length>0?
                     data.map((obj,i)=>
                    {
                       const {cartid,total,prodcuts}=obj
                       const arr= JSON.parse(prodcuts);
                               return(
                                <tr key={i}>
                                <td>{cartid}</td>
                                <td><tr>{arr.map((value)=>    <td> {value.title}   </td> )           }</tr></td>
                                <td>{total}</td>
                                {/* <td>{obj.image}</td> */}
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

export default History
