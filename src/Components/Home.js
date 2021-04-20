import React,{useState,useEffect} from 'react'
import img1 from './images/l1.jpg'
import img2 from './images/l2.jpg'
import img3 from './images/l3.jpg'
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from './data';
function Home()
 {
  const {products}=data;
  
    let styles = {
        margin: 'auto',
        width: '50%'
      };
      const images=[{id:1,imageName:'11.png',tag:'dell'},
      {id:2,imageName:'22.png',tag:'dell'},
      {id:3,imageName:'33.png',tag:'dell'},
      {id:4,imageName:'44.png',tag:'dell'},
      {id:5,imageName:'55.png',tag:'dell'},
      {id:6,imageName:'66.png',tag:'dell'},
      {id:7,imageName:'1.png',tag:'Hp'},
      {id:8,imageName:'2.png',tag:'Hp'},
      {id:9,imageName:'3.png',tag:'Hp'},
      {id:10,imageName:'4.png',tag:'Hp'},
      {id:11,imageName:'5.png',tag:'Hp'},
      {id:12,imageName:'6.png',tag:'Hp'}
  ]
    return (
    
        // <div style={styles}>
		 <div class="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                <div>
                <img src={img2}  />
                </div>
                <div>
                <img src={img1}   />
                </div>
                <div>
                    <img src={img3}   />
                </div>
            </Carousel>
            <h3>Our Products</h3>      


            <div className="row">
               {
                   images.map((im,i)=>
                   {
                       return  <div className="col-3">
                                 <img  src={`/image/${im.imageName}`} alt='no' name={im.id}/>
                                </div>
                   })
               }
           </div> 
    
          


        </div>

	
    )
}
export default Home

