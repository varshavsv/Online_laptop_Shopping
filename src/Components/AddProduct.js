import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

function AddProduct(props) {
    const ref = React.useRef();
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [id, setId] = useState('')
    const [currentId, setCurrentId] = useState('')
    const [allProducts, setAllProducts] = useState([])
    const [btn, setBtn] = useState(true)
    const [view, setView] = useState(true)
    const [file, setFile] = useState("");
    
    useEffect(() =>
    {
        // alert("all prodcuts")
        fetchData();
   },[allProducts])
   const fetchData= ()=>
   {
    axios.get('http://localhost:3001/product').then(res=>{
        // console.log(res.data)
        setAllProducts(res.data);
        }).catch(err=>console.log(err))
   }
   
    const addData= (e)=>
    {
        // console.log("image "+image.name)
        e.preventDefault();
       if(title.length==" " ||  price.length=="" || image.length=="" || image==undefined)
       {
        alert("Enter product details")
       }
       else
       {
        // let formData = new FormData();
        // formData.append('file',image);
        // console.log("img path "+formData)
        const { files } = document.querySelector('input[type="file"]');
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "spworld");
    
        const options = {
          method: "POST",
          body: formData,
        };
            return  fetch(
            "https://api.Cloudinary.com/v1_1/spworld55/image/upload",
            options
          )
          .then((res) => res.json())
          .then((res) => {
           setFile(res.secure_url);

             axios.post('http://localhost:3001/addData',{title,price,file: res.secure_url })
              .then((res) => {
            console.log(res);
        })
            alert("Product added sucessfully");
            setTitle("");
            setPrice("");
            setImage(""); 
            ref.current.value = "";
         
        })
        //   alert("Product added sucessfully");
        //   setAllProducts([...allProducts,{pid:id,name:title,price,image}])
        //   .catch((err) => console.log(err));
        //     })
        //     .catch((err) => console.log(err));
           
       }
      
    }
    const  deleteProduct=(e,pid)=>
   {
    e.preventDefault();
    // alert("delete ")
    console.log("id delete"+pid)
    axios.delete(`http://localhost:3001/delete/${pid}`).then(res=>{
        // console.log(res.data)
    })
     alert("Product deleted sucessfully");
    setAllProducts(allProducts.filter((val)=>{
        return val.pid!=pid;
    }))
    // fetchData();
   }

   const editProduct=(pid)=>{
    alert('edit is called '+pid);
   
    // console.log("edit id "+pid)
    axios.get(`http://localhost:3001/edit/${pid}`).then((res)=>
    {
        console.log("update data ",res.data)
        setAllProducts(res.data);
        setCurrentId(res.data[0].pid);
        setTitle(res.data[0].name);
        setImage(res.data[0].image)
        setPrice(res.data[0].price)
        // .catch((err)=>{
        //     console.log(err)
        // })
    })

    setBtn(false)
    setView(false)
   }

    const update=(e,currentId)=>{
        e.preventDefault();
        alert('update is called '+currentId);
        if(image){
            axios.put(`http://localhost:3001/update/${currentId}`,{title,price,file:image}).then(res=>{
                console.log("update sucess" +res)
              
              })
              alert("Product updated sucessfully");
              setBtn(true)
              setTitle("");
              setPrice("");
              setImage(""); 
            //   ref.current.value = "";
        }
        else{
            const { files } = document.querySelector('input[type="file"]');
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("upload_preset", "spworld");
            
            const options = {
                method: "POST",
                body: formData,
            };
            return  fetch(
                "https://api.Cloudinary.com/v1_1/spworld55/image/upload",
                options
                )
                .then((res) => res.json())
                .then((res) => {
                    setFile(res.secure_url);
                    axios.put(`http://localhost:3001/update/${currentId}`,{title,price,file: res.secure_url}).then(res=>{
                        console.log("update sucess" +res) 
                    
                    }) 
                    alert("Product updated sucessfully");
             setBtn(true)
            setTitle("");
            setPrice("");
            setImage(""); 
            ref.current.value = "";
                })
            }
           
            // ref.current.value = "";   
        // setBtn(true)
        // setTitle(" ")
        // setPrice(" ")
        // setImage(" ")
        // ref.current.value = "";
        
    //     if(image)
    //     { axios.put(`http://localhost:3001/update/${currentId}`,{title,price}).then(res=>{
    //         console.log("update sucess" +res)
    // })

    //     }

    
    }
   const clearData=(e)=>
   {
        e.preventDefault();
        setTitle("");
        setPrice("");
        setImage(""); 
      
   }
   const deleteImg=(e)=>{
       e.preventDefault();
       alert("delete image ")
       setView(true);
       setImage("")
         
   }

 
    return (
        <div className="container">
             <div className="outer">
                 <div className="inner">
            <h5>Add New Product</h5>
            <form>
               <div className="form-group"> 
                <label>Product Title</label>
                <input type="text" id="title" value={title} className="form-control" placeholder="Product Title" onChange={(e)=>setTitle(e.target.value)}/>
               </div>
             
               {
                   view?
                   <div className="form-group"> 
                   <label>Product Image</label>
                   <input type="file" id="image" ref={ref} name="image" className="form-control"  accept=".jpg ,.png , .jpeg, .jfif"/>
                  </div>:
                  <div>
                  <label>Product Image</label>
                  {
                      <img src={image} height="100px" width="100px"/>
                  }
                &nbsp;&nbsp; 
                <button className="btn btn-danger btn-sm" onClick={deleteImg} >X</button>
                  </div>
               }
            
               {/* <div className="form-group"> 
                <label>Product Image</label>
                <input type="file" id="image"  name="image" className="form-control"  accept=".jpg ,.png , .jpeg, .jfif"/>
               </div> */}
               <div className="form-group">
                   <label>Product Price</label>
                <input type="number" id="price" value={price} className="form-control" placeholder="Product Price" onChange={(e)=>setPrice(e.target.value)} />
               </div>
              
               <div>
                      {
                          btn? <button className="btn btn-primary" onClick={addData}>Submit</button>:
                          <button className="btn btn-primary" onClick={(e)=>{update(e,currentId)}}>Update</button>
                      }
                      &nbsp;&nbsp; <button className="btn btn-primary"  onClick={clearData}>clear</button>
                      {/* <button className="btn btn-primary" onClick={addData}>Submit</button>&nbsp;&nbsp; 
                      <button className="btn btn-primary" onClick={clearData}>clear</button> */}
                    
               </div>
               <div>
           </div>
     
           </form> 
           </div>
           </div>

           <table className="table table-striped"> 
                        <tr>
                            {/* <th> Product id</th> */}
                            <th> Product Title</th>
                            <th>Product Price</th>
                            <th>Product Image</th>
                            <th>Action</th>
                        </tr>
                        <tbody> 
                        
                {
                    allProducts.length>0?allProducts.map((obj,i)=>
                    {
                               return(
                                <tr key={i}>
                                {/* <td>{obj.pid}</td> */}
                                <td>{obj.name}</td>
                                <td>{obj.price}</td>
                                <td><img src={obj.image} height="100px" width="100px"/></td>
                                <td>
                                    {/* <button className="btn btn-info btn-sm" onClick={(e)=>editProduct(e,obj.pid,obj.title,obj.image)}>Edit</button>&nbsp;&nbsp; */}
                                   {/* <Link className="btn btn-info btn-sm" to={`/editAdmin/${obj.pid}`}>Edit</Link>&nbsp;&nbsp; */}
                                    <button className="btn btn-info btn-sm" onClick={()=>editProduct(obj.pid)}>Edit</button>&nbsp;&nbsp;
                                    <button className="btn btn-danger btn-sm" onClick={(e)=>deleteProduct(e,obj.pid)} >Delete</button>
                                </td>
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

export default AddProduct
