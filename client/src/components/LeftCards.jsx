function LeftCards() {
  return (
    <div className="w-full md:w-[40%] h-[50vh] flex flex-col-reverse gap-2 py-4">
      {/* Top Card */}
      <div className=" w-full h-1/2 bg-white rounded-2xl cards-bg shadow-lg "></div>

      {/* 2 small cards */}
      <div className="flex w-full h-1/2 gap-2">
        <div className="w-1/2 h-full bg-[#24843E] rounded-2xl p-6 flex flex-col items-start justify-center shadow-lg">
          <h2 className="text-white text-[20px] md:text-2xl font-semibold mb-4">
            Make a Donation
          </h2>
          <p className="text-white mb-4 text-[15px] md:text-[18px]">
            Be the one to make the change
          </p>
          <button className="bg-white text-[#24843E] font-bold py-2 px-6 rounded-full shadow transition duration-300 hover:bg-gray-200">
            Donate Now
          </button>
        </div>

        <div className="w-1/2 h-full bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
          <h2 className="text-black text-2xl font-semibold mb-4">Add Funds</h2>

          <button className="bg-black text-white font-bold py-2 px-8 rounded-full shadow transition duration-300 hover:bg-gray-800">
            Add Funds
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftCards;
