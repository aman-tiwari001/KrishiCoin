import { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import { getFundraisers } from "../apis/fundRaiser";
import CustomLoader from "../components/CustomLoader";

function DonationPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
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
  return (
    <div className="">
      <div className="h-[80px]"></div>
      <h1 className="pt-3 text-center text-3xl font-bold text-theme">
        Active Fundraisers
      </h1>
      <h2 className="text-center text-gray-600">(Crowdfunding compaigns)</h2>
      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
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
