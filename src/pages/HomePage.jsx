import React, { useEffect, useState } from 'react';
// import products from '../../products';
// import axios from 'axios';
import Card from '../components/Card.jsx';
import API from '../API.jsx';

const HomePage = () => {
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    
    API.get( '/api/products').then(res=>{
      setProducts(res.data)
    })
  },[])
  


  return (
    <div className="text-white"> {/* Added padding for better spacing */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-13 gap-y-7">
        {products.map(product => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
