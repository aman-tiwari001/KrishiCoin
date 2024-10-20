import { useEffect, useState } from 'react';
import P2PCard from "../components/P2PCard";
import { getListings } from "../apis/listing";
import CustomLoader from "../components/CustomLoader";
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';

function MarketPlace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getListings();
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
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="">
      <div className="h-[80px]"></div>
      <h1 className='text-3xl mt-5 text-theme text-center'>P2P Marketplace</h1>
      <h1 className='text-gray-500 text-center'>(For farmer produces and crops)</h1>


      <div className="w-full flex_fix_invert items-center justify-center gap-2 mt-8 px-4">
        <label className="input input-bordered flex items-center gap-2 w-1/2 max-md:w-full bg-white shadow-lg text-black">
          <input type="text" className="grow" placeholder="Search" value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)}/>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>


        <Link to="/sell">
        <button className="btn btn-success flex items-center gap-2 bg-[#2bac4b] px-4 py-2 rounded-lg text-white">
        <IoMdAddCircle className="text-lg"/> Add your Crop
        </button>
        </Link>
      </div>


      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
        {
          filteredProducts.length > 0 ? (
            filteredProducts.map((product,index) => (
              <P2PCard
                key={index}
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
