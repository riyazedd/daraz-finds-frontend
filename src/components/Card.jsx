import React, { useState } from "react";

const Card = ({ product }) => {

  return (
    <div className="w-[200px]">
      <a href={product.product_link} target="_blank" rel="noopener noreferrer">
      
          <img src={product.image} alt="product" className="rounded w-30 md:w-[90%]" />
        
      </a>
    </div>
  );
};

export default Card;
