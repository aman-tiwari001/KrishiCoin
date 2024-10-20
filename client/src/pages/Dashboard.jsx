import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser } from "../apis/auth";
import CustomLoader from "../components/CustomLoader";
import Listings from "../components/dashboard/MyListings";
import Orders from "../components/dashboard/MyOrders";
import FundRaisers from "../components/dashboard/MyFundRaisers";
import Donations from "../components/dashboard/MyDonations";
import Blogs from "../components/dashboard/MyBlogs";

function DashBoard() {
  const [activeTab, setActiveTab] = useState("My Donations");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myDonations, setMyDonations] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [myFundraisers, setMyFundraisers] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

	const fetchUser = async () => {
		try {
			const response = await getUser();

      setUser(response);
      // dont remove : for dev purpose
      // console.log("user : ", response);
      // console.log("my donations : ", response.my_donations);
      // console.log("my listings : ", response.my_listings);
      // console.log("my orders : ", response.my_order);
      // console.log("my fundraisers : ", response.my_fundraisers);
      setMyDonations(response.my_donations);
      setMyListings(response.my_listings);
      setMyOrders(response.my_order);
      setMyFundraisers(response.my_fundraisers);
      setMyBlogs(response.my_blogs);
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
			<div className='absolute inset-0 flex items-center justify-center text-black'>
				<div className='flex items-center gap-4'>
					<CustomLoader /> Fetching user data...
				</div>
			</div>
		);
	}

	return (
		<div className='mt-[80px] w-full '>
			{!loading && (
				<div className='p-6 h-[100vh] overflow-auto'>
					<h1 className='text-2xl font-bold mb-4 text-[#00B29F]'>
						<p className='text-black'>
							Hello,{' '}
							<span className='text-[#166d49]'>{user.name || 'Guest'}</span>
						</p>
					</h1>
					<div className='flex space-x-4'>
						<button
							className={`py-2 px-4 font-bold ${
								activeTab === 'My Donations'
									? 'bg-[#00b268] text-white rounded-[6px]'
									: 'bg-[#9c9c9c] text-white rounded-[6px]'
							}`}
							onClick={() => handleTabClick('My Donations')}
						>
							My Donations
						</button>
						<button
							className={`py-2 px-4 font-bold ${
								activeTab === 'My Listings'
									? 'bg-[#00b268] text-white rounded-[6px]'
									: 'bg-[#9c9c9c] text-white rounded-[6px]'
							}`}
							onClick={() => handleTabClick('My Listings')}
						>
							My Listings
						</button>
						<button
							className={`py-2 px-4 font-bold ${
								activeTab === 'My Orders'
									? 'bg-[#00b268] text-white rounded-[6px]'
									: 'bg-[#9c9c9c] text-white rounded-[6px]'
							}`}
							onClick={() => handleTabClick('My Orders')}
						>
							My Orders
						</button>
						<button
							className={`py-2 px-4 font-bold ${
								activeTab === 'My Fundraisers'
									? 'bg-[#00b268] text-white rounded-[6px]'
									: 'bg-[#9c9c9c] text-white rounded-[6px]'
							}`}
							onClick={() => handleTabClick('My Fundraisers')}
						>
							My Fundraisers
						</button>
						<button
							className={`py-2 px-4 font-bold ${
								activeTab === 'My Blogs'
									? 'bg-[#00b268] text-white rounded-[6px]'
									: 'bg-[#9c9c9c] text-white rounded-[6px]'
							}`}
							onClick={() => handleTabClick('My Blogs')}
						>
							My Blogs
						</button>
					</div>
					<div className='mt-4 mb-4'>
						{activeTab === 'My Donations' && (
							<div className='flex flex-col gap-2'>
								{myDonations.length > 0 ? (
									myDonations.map((donations, index) => (
										<Link
											to={`/campaign/${donations.fundraiser._id}`}
											key={index}
										>
											<Donations
												id={donations.fundraiser._id}
												src={donations.fundraiser.images[0]}
												title={donations.fundraiser.title}
												donated_at={donations.donated_at}
												amount={donations.amount}
												owner={donations.fundraiser.owner.name}
											/>
										</Link>
									))
								) : (
									<p className='text-white w-full h-[200px] bg-green-700 rounded-md mx-auto flex justify-center items-center text-[19px]'>
										No donations found
									</p>
								)}
							</div>
						)}

						{activeTab === 'My Listings' && (
							<div className='flex flex-col gap-2'>
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
									<p className='text-white w-full h-[200px] bg-green-700 rounded-md mx-auto flex justify-center items-center text-[19px]'>
										No listings found
									</p>
								)}
							</div>
						)}

						{activeTab === 'My Orders' && (
							<div className='flex flex-col gap-2'>
								{myOrders.length > 0 ? (
									myOrders.map((order, index) => (
										<Link to={`/listing/${order.listing._id}`} key={index}>
											<Orders
												src={order.listing.images[0]}
												title={order.listing.title}
												desc={order.listing.desc}
												seller={order.seller.name}
												price={order.price}
												status={order.status}
											/>
										</Link>
									))
								) : (
									<p className='text-white w-full h-[200px] bg-green-700 rounded-md mx-auto flex justify-center items-center text-[19px]'>
										No orders found
									</p>
								)}
							</div>
						)}

            {activeTab === "My Fundraisers" && (
              <div className="flex flex-col gap-2">
                {myFundraisers.length > 0 ? (
                  myFundraisers.map((fundraiser, index) => (
                    <Link to={`/campaign/${fundraiser._id}`} key={index}>
                      <FundRaisers
                        src={fundraiser.images[0]}
                        title={fundraiser.title}
                        deadline={fundraiser.deadline}
                        price={fundraiser.price}
                        funded={
                          (fundraiser.amt_collected / fundraiser.target_funds) *
                          100
                        }
                        donators_cnt={fundraiser.donatorsCount}
                        amt_collected={fundraiser.amt_collected}
                      />
                    </Link>
                  ))
                ) : (
                  <p className="text-white w-full h-[200px] bg-green-700 rounded-md mx-auto flex justify-center items-center text-[19px]">
                    No fundraisers found
                  </p>
                )}
              </div>
            )}


            {
              activeTab === "My Blogs" && (
                <div className="flex flex-col gap-2">
                  {myBlogs.length > 0 ? (
                    myBlogs.map((blog, index) => (
                      <Link to={`/blog/${blog._id}`} key={index}>
                        <Blogs
                          src={blog.image}
                          title={blog.title}
                          created_at={blog.createdAt}
                          upvotes={blog.upvotes.length}
                          downvotes={blog.downvotes.length}
                        />
                      </Link>
                    ))
                  ) : (
                    <p className="text-white w-full h-[200px] bg-green-700 rounded-md mx-auto flex justify-center items-center text-[19px]">
                      No blogs found
                    </p>
                  )}
                </div>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
