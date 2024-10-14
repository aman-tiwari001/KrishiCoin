import React ,{useState} from "react";
import Carousel from "../components/Carousel";

const images = [
  "https://t3.ftcdn.net/jpg/01/85/36/76/240_F_185367679_Me2IGPUlNgmA3xJdbewSlT0jIM9RqGx2.jpg",
  "https://t3.ftcdn.net/jpg/01/85/36/76/240_F_185367679_Me2IGPUlNgmA3xJdbewSlT0jIM9RqGx2.jpg",
  "https://t3.ftcdn.net/jpg/01/85/36/76/240_F_185367679_Me2IGPUlNgmA3xJdbewSlT0jIM9RqGx2.jpg",
  "https://t3.ftcdn.net/jpg/01/85/36/76/240_F_185367679_Me2IGPUlNgmA3xJdbewSlT0jIM9RqGx2.jpg",
  "https://t3.ftcdn.net/jpg/01/85/36/76/240_F_185367679_Me2IGPUlNgmA3xJdbewSlT0jIM9RqGx2.jpg",
  "https://t3.ftcdn.net/jpg/01/85/36/76/240_F_185367679_Me2IGPUlNgmA3xJdbewSlT0jIM9RqGx2.jpg",
  "https://t3.ftcdn.net/jpg/01/85/36/76/240_F_185367679_Me2IGPUlNgmA3xJdbewSlT0jIM9RqGx2.jpg",
];

const product = {
  title: "Fresh Tomatoes",
  description:
    "Elevate your culinary creations with our farm-fresh tomatoes! Handpicked at peak ripeness, these vibrant, plump tomatoes burst with flavor and juiciness. Perfect for salads, sauces, or simply enjoyed on their own, our tomatoes are grown sustainably without pesticides, ensuring you get the best taste nature has to offer.Each tomato boasts a rich, sweet flavor with just the right amount of acidity, making them ideal for a variety of dishes—from classic caprese salads to hearty pasta sauces. With their vibrant red color and firm texture, they add a delightful pop to any meal. Packaged with care, our tomatoes are not only a treat for your taste buds but also a healthy choice, packed with vitamins and antioxidants. Bring home the taste of summer all year round and experience the difference of fresh, quality produce.",
  price: 50,
  quantityLeft: 100,
  city: "Jind",
  state: "Haryana",
};

const Details = () => {
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value, 10) || 0;
        setQuantity(qty);
        setTotal(qty * product.price);
      };


  return (
    <div className=" flex flex-row items-start  ml-0 h-minus-80 overflow-hidden">
      <div className="flex flex-col p-3 bg-red-00  h-[99vh] pt-12 w-1/2 ">
        <div className=" h-[310px] w-[430px]  m-12 ">
          <Carousel images={images} /> {/* Pass images to the Carousel */}
        </div>
        <h2 className="text-2xl pl-2 text-[#283e2f] ">{product.title}</h2>
        <h2 className="bg-cyan-00 p-2 overflow-scroll">
          {product.description}
        </h2>
      </div>

      <div className=" flex flex-col p-3 bg-r-500  h-[99vh] pt-12 w-1/2">
        <h2 className="text-xl font-semibold pl-2 mt-12 text-[#283e2f] ">
          Quantity Left:
        </h2>
        <h2 className="text-sm font-normal pl-2  text-[#283e2f] ">
          (in Quintals)
        </h2>
        <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
          {" "}
          {product.quantityLeft}
        </h2>

        <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
          Price:
        </h2>
        <h2 className="text-sm font-normal pl-2  text-[#283e2f] ">
          (per Quintal)
        </h2>
        <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
          {product.price}
        </h2>

        <div className="flex">
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              City:
            </h2>
            <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
              {product.city}
            </h2>
          </div>
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              State:
            </h2>
            <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
              {product.state}
            </h2>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              Enter Quantity:
            </h2>
            <input
              type="number"
               id="quantity"
               value={quantity}
               onChange={handleQuantityChange}
               min="0"     
              placeholder="in quintals"
              className="text-lg pl-4 bg-transparent border-2 rounded-xl m-2 text-[#283e2f] "
            >
            </input>
          </div>
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              Total Amount:
            </h2>
            <h2
            //   value={product.price*total}
              className="text-lg pl-4 bg-transparent border-2 rounded-xl m-2 text-[#283e2f] "
            >
                ₹ {total}
            </h2>
          </div>
        </div>

        <div className="btn mt-6 text-[#e0fce7] bg-[#233b2b]">Buy Now</div>
      </div>
    </div>
  );
};

export default Details;
