import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import ProgressBar from "../components/ProgressBar";
import { useParams } from "react-router-dom";
import CustomLoader from "../components/CustomLoader";
import { getFundraiser } from "../apis/fundRaiser";
import { formatDistanceStrict, isPast } from "date-fns";

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
  title: "Money to buy food ",
  description:
    "Elevate your culinary creations with our farm-fresh tomatoes! Handpicked at peak ripeness, these vibrant, plump tomatoes burst with flavor and juiciness. Perfect for salads, sauces, or simply enjoyed on their own, our tomatoes are grown sustainably without pesticides, ensuring you get the best taste nature has to offer.Each tomato boasts a rich, sweet flavor with just the right amount of acidity, making them ideal for a variety of dishes—from classic caprese salads to hearty pasta sauces. With their vibrant red color and firm texture, they add a delightful pop to any meal. Packaged with care, our tomatoes are not only a treat for your taste buds but also a healthy choice, packed with vitamins and antioxidants. Bring home the taste of summer all year round and experience the difference of fresh, quality produce.",
  target_fund: 7000,
  owner: "Iqbal Kadri",
  deadline: 43,
  supporters: 101,
  amt_collected: 5547,
};

const CrowdFundDetails = () => {
  const { id } = useParams();
  const [fundraiser, setFundraiser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10) || 0;
    if (qty === 0) {
      setError("Quantity cannot be 0");
      setQuantity(qty);
      setTotal(0);
    } else {
      setQuantity(qty);
      setTotal(qty * product.price);
    }
  };

  const getFundraiserDetail = async () => {
    try {
      const response = await getFundraiser(id);
      setFundraiser(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching fundraiser:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFundraiserDetail();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-black">
        <div className="flex items-center gap-4">
          <CustomLoader /> Fetching Campaign Details...
        </div>
      </div>
    );
  }

  const deadlineDate = new Date(fundraiser.deadline);
  const daysLeft = formatDistanceStrict(deadlineDate, new Date());
  const deadlineExpired = isPast(deadlineDate);
  const deadlineMessage = deadlineExpired ? "Expired" : `${daysLeft} left`;

  return (
    <div className=" flex flex-row items-start  ml-0 h-minus-80 overflow-hidden">
      <div className="flex flex-col p-3 bg-red-00  h-[99vh] pt-12 w-1/2 ">
        <div className=" h-[310px] w-[430px]  m-12 ">
          <Carousel images={fundraiser.images} />
        </div>
        <h2 className="text-2xl bg-red-3 flex items-center justify-between pl-2 text-[#283e2f] ">
          <div>{fundraiser.title}</div>
          {/* <h5 className="text-base mr-4">~by {product.owner}</h5> */}
        </h2>
        <h2 className="bg-cyan-00 p-2 overflow-scroll">{fundraiser.desc}</h2>
      </div>

      <div className=" flex flex-col p-3 bg-red-00  h-[99vh] pt-14 w-1/2">
        <h2 className="text-2xl font-semibold  mt-12 text-[#283e2f] ">
          For Helping, {fundraiser.owner.name}
        </h2>
        <h2 className="text-6xl font-semibold pl-8 mt-10 text-slate-700 ">
          $ {fundraiser.amt_collected}
        </h2>
        <h2 className="text-sm font-normal pl-8 pt-2  text-[#283e2f] ">
          <span>raised of </span>
          <span className="text-slate-500 text-lg font-medium">
            {" "}
            USD {fundraiser.target_funds}
          </span>
          <span> Goal</span>
        </h2>
        <ProgressBar
          currentAmount={fundraiser.amt_collected}
          targetAmount={fundraiser.target_funds}
        />

        <div className="flex mt-10 justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold pl-2  text-[#283e2f] ">
              {deadlineMessage}
            </h2>
            {/* <h2 className="text-lg pl-4   text-[#283e2f] ">Days left</h2> */}
          </div>
          <div className="flex items-center">
            <h2 className="text-xl font-semibold pl-2  text-[#283e2f] ">
              {fundraiser.donatorsCount}
            </h2>
            <h2 className="text-lg pl-4   text-[#283e2f] ">supporters</h2>
          </div>
        </div>

        <div className="flex mt-6 flex-col">
          <h2 className="text-xl font-semibold pl-2  text-[#283e2f] ">
            Contribution Amount:
          </h2>
          <h2 className="text-sm font-semibold pl-4  text-[#283e2f] ">
            (in USD)
          </h2>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            placeholder="in quintals"
            className="text-lg pl-4 bg-transparent border-2 rounded-xl m-2 text-[#283e2f] "
          ></input>
        </div>

        <div className="btn mt-6 text-[#e0fce7] bg-[#233b2b]">
          Contribute Now
        </div>
      </div>
    </div>
  );
};

export default CrowdFundDetails;
