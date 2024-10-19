import { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import { getFundraisers } from "../apis/fundRaiser";
import CustomLoader from "../components/CustomLoader";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

function DonationPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getFundraisers();
        setCampaigns(response);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-black">
        <div className="flex items-center gap-4">
          <CustomLoader /> Fetching active fundraisers...
        </div>
      </div>
    );
  }
  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="">
      <div className="h-[80px]"></div>
      <h1 className="pt-3 text-center text-3xl font-bold text-theme">
        Active Fundraisers
      </h1>
      <h2 className="text-center text-gray-600">(Crowdfunding campaigns)</h2>

      <div className="w-full flex_fix_invert items-center justify-center gap-2 mt-8 px-4">
        <label className="input input-bordered flex items-center gap-2 w-1/2 max-md:w-full bg-white shadow-lg text-black">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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

        <Link to="/campaignform">
          <button className="btn btn-success flex items-center gap-2 bg-[#2bac4b] px-4 py-2 rounded-lg text-white">
            <IoMdAddCircle className="text-lg" /> Start Fund Raiser
          </button>
        </Link>
      </div>
      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <CampaignCard
              id={campaign.id}
              key={campaign.id}
              title={campaign.title}
              target={campaign.target}
              amtfunded={campaign.amtFunded}
              deadline={campaign.deadline}
              author={campaign.owner.name}
              image={campaign.image}
            />
          ))
        ) : (
          <p className="card h-[250px] bg-[#283e2f] text-[#e0fce7] w-96 shadow-xl rounded-lg overflow-hidden justify-center items-center">
            No campaigns found
          </p>
        )}
      </div>
    </div>
  );
}

export default DonationPage;
