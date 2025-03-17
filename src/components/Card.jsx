import React, { useEffect, useState } from "react";
import { fetchImage } from "../utils/productImage";

const Card = ({ product }) => { 
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      if (product.product_link) {
        setLoading(true);
        const { imageUrl, error } = await fetchImage(product.product_link);
        setImageUrl(imageUrl);
        setError(error);
        setLoading(false);
      }
    };

    loadImage();
  }, [product.product_link]);

  return (
    <div className="w-[200px]">
      <a href={product.product_link} target="_blank" rel="noopener noreferrer">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <img src={imageUrl} alt="product" className="rounded w-30 md:w-[90%]" />
        )}
      </a>
    </div>
  );
};

export default Card;
