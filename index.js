import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app=express();

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    user:"root",
    host:'localhost',
    password:'root',
    database:'shopping'
})
app.post('/register',(req,res)=>{
    const userName=req.body.uname;
    const email=req.body.email;
    const password=req.body.pass;
    const cpassword=req.body.cpass;
    const mobile=req.body.mobile;
    const address=req.body.address;
    db.query("insert into signup (username,email,password,cpassword,mobileno,address) values (?,?,?,?,?,?)",[userName,email,password,cpassword,mobile,address],(err,res)=>{
        console.log(res);
        console.log(err);
    })

})
app.post('/addData',(req,res)=>{
    const title=req.body.title;
    console.log("title "+title)
    const price=req.body.price;
    console.log("price "+price)
    const image=req.body.file;
    console.log("image "+image)
    db.query("insert into products (name,price,image) values (?,?,?)" ,[title,price,image],(res,err)=>{
        if(res){console.log(res)}
        else{console.log(err);}
    })
   
})
app.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    db.query("select * from signup where email=? and password=?",[email,password],(err,result)=>{
        if(err)
        {
            // console.log(err)
        res.send({err:err})
    }
     
        if(result.length>0)
        {
         res.send(result)
        }
         else{
             res.send({message:"invalid username and password"})
         }
       
    })
})


app.get('/product',(req,res)=>{
    db.query("select * from products",(err,result)=>{
       if(err)
       {
           res.send({err:err})
       }
       if(result.length>0)
       {
        res.send(result)
       }
        else{
            res.send({message:"No data"})
        }
      
    })

})
app.post('/data',(req,res)=>{
    const id=req.body.id;
    console.log("id is "+id)
    const prodcuts=req.body.myCart;
    const total=req.body.t;
    console.log(prodcuts)
    db.query("insert into cart_info (userid,prodcuts,total,orderDate) values (?,?,?,now()",[id,prodcuts,total],(err,result)=>{
        if(err)
        {
            // console.log(err)
        res.send({err:err})
        }
     
        // if(result.length>0)
        // {
        //  res.send(result)
        // }
        //  else{
        //      res.send({message:"error"})
        //  }
       
    })

})

app.get('/cartData',(req,res)=>{
    db.query("select * from cart_info",(err,result)=>{
       if(err)
       {
           res.send({err:err})
       }
       if(result.length>0)
       {
        res.send(result)
       }
        else{
            res.send({message:"No data"})
        }
      
    })

})

app.get('/user',(req,res)=>{
    db.query("select * from signup",(err,result)=>{
       if(err)
       {
           res.send({err:err})
       }
       if(result.length>0)
       {
        res.send(result)
       }
        else{
            res.send({message:"No data"})
        }
      
    })

})

app.delete('/delete/:pid',(req,res)=>{
    const id=req.params.pid;
    console.log("id "+id);
    db.query("delete from products where pid = ?",id,(res,err)=>{
     if(err)
     {
        console.log(err);
     }
      else{
        console.log(res)
      }
    }
    )
})

app.get('/edit/:pid',(req,res)=>{
    const id=req.params.pid;
    console.log("edit id "+id)
    db.query("select * from products where pid=?",id,(err,result)=>{
        if(err)
       {
           res.send({err:err})
       }
       if(result.length>0)
       {
        res.send(result)
       }
        else{
            res.send({message:"No data"})
        }
    })
})

app.put('/update/:pid',(req,res)=>{
    const id=req.params.pid;
    console.log("id "+id);
    const newName=req.body.title;
    console.log("name "+newName)
    const newPrice=req.body.price;
    console.log("price "+newPrice)
    const image=req.body.file;
    console.log("img "+image);
    // if( image!==null ||image!=undefined)
    {
        db.query("update products set name= ?, price =? , image =? where pid=?",[newName,newPrice,image,id],(res,err)=>
        {
            if(res){
                console.log(res)
            }
            else{
                console.log(err)
            }
        })
    }
    // else{

    //     db.query("update  products set name = ?, price =? where pid=?",[newName,newPrice,id],(res,err)=>{
    //        if(err){ console.log(err);}
    //         else{console.log(res)}
    //     }
    //     )
    // }
})

app.get('/history/:id',(req,res)=>{
    const id=req.params.id;
   console.log("id  "+id)
    db.query("select * from cart_info where userid=?",[id],(err,result)=>{
     if(err){
         console.log(err)
     }
     else{
         console.log(result)
         res.send(result)
     }
       
    })
})
app.listen(3001,()=>console.log("server has started"))
cors();