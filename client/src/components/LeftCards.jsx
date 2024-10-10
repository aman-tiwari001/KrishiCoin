function LeftCards() {
  return (
    <div className="w-full md:w-[40%] h-[50vh] flex flex-col-reverse gap-2 py-4">
      {/* Top Card */}
      <div className=" w-full h-1/2 bg-white rounded-2xl cards-bg shadow-lg ">
        <div className="w-[100%] h-[100%] bg-gradient-to-b from-[#283618] to-black opacity-[0.8] rounded-2xl flex items-center justify-center ">
          <h1 className="text-4xl text-[#e0fce7] font-semibold">
            User Dashboard
          </h1>
        </div>
      </div>

      {/* 2 small cards */}
      <div className="flex w-full h-1/2 gap-2">
        <div className="w-1/2 h-full bg-[#283618] rounded-2xl px-10 max-md:px-4 py-6 flex flex-col items-start justify-center shadow-lg">
          <h2 className="text-[#e0fce7] text-[20px] md:text-xl font-semibold mb-4">
            Make a Donation
          </h2>
          <p className="text-[#e0fce7] mb-4 text-[15px] md:text-[13px]">
            Be the one to make the change in people's lives
          </p>
          <button className="bg-white text-[#24843E] font-bold py-2 px-6 rounded-full shadow transition duration-300 hover:bg-gray-200">
            Donate Now
          </button>
        </div>

        <div className="w-1/2 h-full rounded-2xl bg-white bg-gradient-to-bl from-[#7C5D25] to-[#C9A53D]  flex flex-col items-center justify-center shadow-lg">
          <div className="w-[96%] h-[96%] rounded-2xl bg-white m-2  p-6 flex flex-col items-center justify-center ">
            <h2 className="text-black text-xl font-semibold mb-4">
              Add Funds to your wallet
            </h2>

            <button className="bg-gradient-to-bl from-[#7C5D25] to-[#C9A53D] text-white font-bold py-2 px-8 rounded-full shadow transition duration-300 hover:bg-gray-800">
              Add Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftCards;
