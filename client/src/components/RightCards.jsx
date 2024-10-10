function RightCards() {
  return (
    <div className="w-full md:w-[60%] h-[50vh] flex flex-col gap-2 md:py-4">
      {/* Top Card */}
      <div className="w-full h-1/2 bg-[#19747E] cards2-bg rounded-2xl  ">
        <div className="w-[100%] h-[100%] bg-gradient-to-br from-[#20705b] to-[#012513] flex flex-col items-center justify-center shadow-lg opacity-[0.8] px-4 py-6 rounded-2xl  ">
          <h2 className="text-[#e0fce7] text-2xl font-semibold mb-4">
            Join Communities
          </h2>
          <p className="text-[#e0fce7] text-center mb-4">
            Be part of a vibrant community where you can connect, share, and
            grow together. Explore resources, events, and opportunities to
            engage with like-minded individuals!
          </p>
          <button className="bg-black text-white font-bold py-1 mt-[-5px] px-6 rounded-full shadow transition duration-300 hover:bg-gray-700">
            Explore
          </button>
        </div>
      </div>

      {/* 3 small cards */}
      <div className="flex w-full h-1/2 gap-2">
        <div className="w-2/4 h-2/3 md:h-full bg-[#A9D6E5] rounded-2xl  flex flex-col justify-evenly shadow-lg">
          <div className="w-[100%] h-[100%] z-50 bg-gradient-to-br from-[#A4C8E1] to-[#5a8cbc] flex flex-col items-center justify-center shadow-lg opacity-[0.8] px-4 py-6 rounded-2xl  ">
            <h2 className="text-white text-xl font-bold">Sell Your Crops</h2>
            <p className="text-white text-[10px] md:text-[15px]">
              Connect directly with lenders. Get better rates and flexible
              terms.
            </p>
          </div>
        </div>
        <div className="w-1/4 h-2/3 md:h-full bg-[#A9D6E5] rounded-2xl  flex flex-col justify-evenly shadow-lg">
          <div className="w-[100%] h-[100%] z-50 bg-gradient-to-br from-[#71aad2] to-[#203673] flex flex-col items-center justify-center shadow-lg opacity-[0.8] px-4 py-6 rounded-2xl  ">
            <h2 className="text-[#e0fce7] text-xl font-bold">Sell Crops</h2>
            
          </div>
        </div>
        <div className="w-1/4 h-2/3 md:h-full  rounded-2xl cards3-bg flex flex-col items-center justify-center shadow-lg">
          <div className="w-[100%] h-[100%] z-50 bg-black flex flex-col items-center justify-center shadow-lg opacity-[0.7] px-4 py-6 rounded-2xl  ">
          <h2 className="text-white top-4 max-md:text-sm text-md font-bold">P2P Marketplace</h2>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default RightCards;
