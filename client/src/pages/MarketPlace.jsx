import { useEffect, useState } from 'react';
import P2PCard from "../components/P2PCard";
import { getListings } from "../apis/listing";
import CustomLoader from "../components/CustomLoader";

function MarketPlace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getListings();
        console.log("response", response);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (loading) {
		return (
			<div className='absolute inset-0 flex items-center justify-center text-black'>
				<div className='flex items-center gap-4'>
					<CustomLoader /> Fetching available products...
				</div>
			</div>
		);
	}
  return (
    <div className="h-screen">
      <div className="h-[80px]"></div>
      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
        {
          products.length > 0 ? (
            products.map((product) => (
              <P2PCard
                key={product.id}
                id={product._id}
                title={product.title}
                city={product.city}
                state={product.state}
                user={product.owner.name}
                quantity={product.total_stock}
                price={product.price}
                quantityLeft={((product.total_stock-product.sold_stock)/product.total_stock)*100} 
                // location={product.location}
                image={product.images[0]}
              />
            ))
          ) : (
            <p className="card h-[250px] bg-[#283e2f] text-[#e0fce7] w-96 shadow-xl rounded-lg overflow-hidden justify-center items-center">
              No products found
            </p>
          )
        }
      </div>

     
    </div>
  );
}

export default MarketPlace;
