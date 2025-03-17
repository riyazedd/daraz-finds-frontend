import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import API from "../API";

const CategoryPage = () => {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(id);

  useEffect(() => {
    if (!id) return; 

    setLoading(true);
    API.get( '/api/products')
      .then((res) => {
        console.log("Fetched Products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const product= products.filter(p=>p.category===id);

  return (
    <div className="text-white">
      {loading ? (
        <p className="text-lg ">Loading products...</p>
      ) : product.length > 0 ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {product.map((p) => (
            <Card key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-lg col-span-full">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
