import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser } from "../apis/auth";
import CustomLoader from "../components/CustomLoader";
import Listings from "../components/dashboard/MyListings";

function DashBoard() {
  const [activeTab, setActiveTab] = useState("My Donations");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myDonations, setMyDonations] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [myFundraisers, setMyFundraisers] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const fetchUser = async () => {
    try {
      const response = await getUser();

      setUser(response);
      console.log(response);
      // dont remove : for dev purpose
      // console.log("my donations : ", response.my_donations);
      // console.log("my listings : ", response.my_listings);
      // console.log("my orders : ", response.my_order);
      // console.log("my fundraisers : ", response.my_fundraisers);
      setMyDonations(response.my_donations);
      setMyListings(response.my_listings);
      setMyOrders(response.my_order);
      setMyFundraisers(response.my_fundraisers);
      const listing = myListings[0];
      const quantity_left =
        ((listing.total_stock - listing.sold_stock) / listing.total_stock) *
        100;
      console.log("quantity_left", quantity_left);
      console.log("true");
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-black">
        <div className="flex items-center gap-4">
          <CustomLoader /> Fetching user data...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[80px] w-full ">
      {!loading && (
        <div className="p-6 h-[100vh] overflow-auto">
          <h1 className="text-2xl font-bold mb-4 text-[#00B29F]">
            <p className="text-black">
              Hello,{" "}
              <span className="text-[#00B29F]">{user.username || "Guest"}</span>
            </p>
          </h1>
          <div className="flex space-x-4">
            <button
              className={`py-2 px-4 ${
                activeTab === "My Donations"
                  ? "bg-[#00B29F] text-white rounded-[6px]"
                  : "bg-[#9c9c9c] text-white rounded-[6px]"
              }`}
              onClick={() => handleTabClick("My Donations")}
            >
              My Donations
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "My Listings"
                  ? "bg-[#00B29F] text-white rounded-[6px]"
                  : "bg-[#9c9c9c] text-white rounded-[6px]"
              }`}
              onClick={() => handleTabClick("My Listings")}
            >
              My Listings
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "My Orders"
                  ? "bg-[#00B29F] text-white rounded-[6px]"
                  : "bg-[#9c9c9c] text-white rounded-[6px]"
              }`}
              onClick={() => handleTabClick("My Orders")}
            >
              My Orders
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "My Transactions"
                  ? "bg-[#00B29F] text-white rounded-[6px]"
                  : "bg-[#9c9c9c] text-white rounded-[6px]"
              }`}
              onClick={() => handleTabClick("My Transactions")}
            >
              My Transactions
            </button>
          </div>
          <div className="mt-4 mb-4">
            {activeTab === "My Donations" && (
              <div className="flex flex-col gap-2">
                {/* {user.my_donations.map((donations, index) => (
                  <Link to={`/details/${donations.listing._id}`} key={index}>
                    
                  </Link>
                ))} */}
              </div>
            )}

            {activeTab === "My Listings" && (
              <div className="flex flex-col gap-2">
                {myListings.length > 0 ? (
                  myListings.map((listing, index) => (
                    <Link to={`/listing/${listing._id}`} key={index}>
                      <Listings
                        src={listing.images[0]}
                        title={listing.title}
                        desc={listing.desc}
                        price={listing.price}
                        total_stock={listing.total_stock}
                        quantity_left={
                          ((listing.total_stock - listing.sold_stock) /
                            listing.total_stock) *
                          100
                        }
                      />
                    </Link>
                  ))
                ) : (
                  <p className="text-white w-full h-[200px] bg-green-700 rounded-md mx-auto flex justify-center items-center text-[19px]">
                    No listings found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
