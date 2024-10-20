import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import ConnectWalletBtn from "../components/ConnectWalletBtn";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useWalletStore } from "../store/WalletStore";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

const LadderFeature = ({ title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="mb-16 flex items-center"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: index % 2 === 0 ? 0 : 0 } : {}}
      transition={{ duration: 1, delay: index * 0.2 }}
    >
      <div className="w-10 h-full bg-blue-00 rounded-l-full relative">
        <motion.div
          className="w-10 h-10 bg-white rounded-full border-2 border-green-500 absolute top-1/2 left-0 transform -translate-y-1/2"
          initial={{ rotate: index % 2 === 0 ? 45 : -45 }}
          whileInView={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>

      <div className="ml-11 bg-cyan-00 text-left">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 w-[46vw]  bg-slate-100 p-3 rounded-e-2xl rounded-b-2xl border-gray-100 border-[10px] mt-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const setAddress = useWalletStore((state) => state.setAddress);
  const walletSuccessHandler = (address) => {
    console.log(`Wallet connected: ${address}`);
    setAddress(address);
    localStorage.setItem("base-wallet-address", address);
    navigate("/get-basename");
  };
  const walletErrorHandler = (error) => {
    console.error(`Wallet connection error: ${error.message}`);
    toast.error("Wallet connection error. Please try again.");
  };

  const account = useAccount();
  useEffect(() => {
    if (account.isConnected) {
        navigate("/home");
      console.log(`Wallet connected: ${address}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#3da898] to-[#000000] text-gray-900">
      <div className="z-0 absolute h-screen w-screen">
        <img
          className=" h-screen w-screen"
          src="https://images.pexels.com/photos/247616/pexels-photo-247616.jpeg?cs=srgb&dl=pexels-pixabay-247616.jpg&fm=jpg"
        />
      </div>
      <div className=" z-20 absolute top-0 bg-gradient-to-r from-[#3b622c] to-[#101264] opacity-[0.6] h-screen w-screen flex items-center justify-center"></div>
      <div className="absolute top-0 h-[80px] z-50 w-full  flex items-center p-4 justify-between ">
        <div className="flex p-4 items-center space-x-2 ">
          <img src="/krishi-coin-logo.png" alt="Logo" className="h-12" />
          <span className="text-[#3ed83e] text-[32px] font-bold max-md:hidden">
            KrishiCoin
          </span>
        </div>
        <motion.button
          className=" bg-white text-green-500 text-sm h-[80%]  flex items-center rounded-lg shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {/* <Link to='/home'>Get Started</Link> */}
          <ConnectWalletBtn
            handleSuccess={walletSuccessHandler}
            handleError={walletErrorHandler}
          />
        </motion.button>
      </div>
      <section className="h-screen flex items-center justify-center">
        <div className="text-center z-50">
          <motion.h1
            className="text-7xl flex flex-col justify-center font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex justify-center items-center">
              <span>Welcome to </span>
              <span className=" font-extrabold pl-3 text-[#3ef657] ">
                {" "}
                KrishiCoin
              </span>
            </div>
            <img
              className="h-[70px] mt-6"
              src="https://docs.base.org/img/logo_dark.svg"
            />
          </motion.h1>
          <motion.p
            className="mt-4 text-2xl  text-gray-100"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <span>" Empowering Farmers, Connecting Communities: Shop Fresh, Support Local! "</span>
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-300 via-emerald-400 to-lime-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl text-white font-semibold mb-12">
		   How It Works ? 
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <motion.div
              className="p-6 bg-gradient-to-r from-green-200  to-slate-200 text-[#248f24] shadow-lg rounded-md"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">
                Step 1: Register 🚀
              </h3>
              <p>Create your account and join the community.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="p-6 bg-gradient-to-l from-green-200  to-slate-200 text-[#248f24] shadow-lg rounded-md"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Step 2: Explore 🔍</h3>
              <p>Browse products, crowdfunding, and blogs.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="p-6 bg-gradient-to-r  from-green-200  to-slate-200 text-[#248f24] shadow-lg rounded-md"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Step 3: Engage 🛒</h3>
              <p>Buy directly or contribute to fundraisers.</p>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="p-6 bg-gradient-to-l from-green-200  to-slate-200 text-[#248f24] shadow-lg rounded-md"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Step 4: Grow 🌍</h3>
              <p>Invite others and make a bigger impact.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-300 via-emerald-400 to-lime-500">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl text-white font-semibold mb-12">
            Why KrishiCoin? 🌾
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="p-6 bg-green-100 shadow-lg rounded-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Empower Farmers 💪
              </h3>
              <p className="text-left">
                Directly support farmers by eliminating intermediaries, allowing
                them to receive fair compensation for their hard work.
              </p>
              <ul className="list-disc list-inside text-left mt-4">
                <li>🔄 Transparent blockchain-based transactions</li>
                <li>🛍️ Buy directly from farmers</li>
                <li>📈 Increase farmers' profits with fair trade</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 bg-yellow-100 shadow-lg rounded-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Crowdfunding Impact 🤝
              </h3>
              <p className="text-left">
                Join hands to contribute to meaningful causes by participating
                in farm-related fundraising campaigns.
              </p>
              <ul className="list-disc list-inside text-left mt-4">
                <li>💰 Support projects for equipment and crop care</li>
                <li>📢 Community-powered fundraisers for emergencies</li>
                <li>🚜 Help farmers grow with your small contributions</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 bg-blue-100 shadow-lg rounded-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Fair & Direct Marketplace 🛒
              </h3>
              <p className="text-left">
                Purchase fresh, high-quality produce directly from farmers,
                ensuring fair prices for both buyers and sellers.
              </p>
              <ul className="list-disc list-inside text-left mt-4">
                <li>🍅 Access seasonal products and organic goods</li>
                <li>⚖️ Blockchain ensures price transparency</li>
                <li>🚚 Fast delivery with minimal overhead</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 bg-purple-100 shadow-lg rounded-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Stay Informed with Blogs 📝
              </h3>
              <p className="text-left">
                Explore stories, tips, and insights shared by the community to
                stay up-to-date on agricultural trends.
              </p>
              <ul className="list-disc list-inside text-left mt-4">
                <li>📖 Read farmer stories and success journeys</li>
                <li>💡 Discover innovative farming techniques</li>
                <li>🗣️ Engage with the community through comments</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 bg-red-100 shadow-lg rounded-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Blockchain-Powered Security 🔐
              </h3>
              <p className="text-left">
                Enjoy secure and transparent transactions backed by blockchain
                technology to protect every interaction.
              </p>
              <ul className="list-disc list-inside text-left mt-4">
                <li>🔒 Tamper-proof records and transactions</li>
                <li>✅ Verify every purchase on the blockchain</li>
                <li>🔗 Complete transparency for all stakeholders</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 bg-teal-100 shadow-lg rounded-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Community-Driven Growth 🌱
              </h3>
              <p className="text-left">
                Be part of a growing community that fosters sustainability,
                innovation, and agricultural development.
              </p>
              <ul className="list-disc list-inside text-left mt-4">
                <li>🎉 Collaborate with other supporters and experts</li>
                <li>🚀 Drive growth through shared knowledge and efforts</li>
                <li>🌍 Make a positive impact on rural economies</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-300 via-emerald-400 to-lime-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl text-white font-semibold mb-12">
            Ecosystem We Built On 🛠️
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Base Card */}
            <motion.div
              className="p-6 bg-gradient-to-r from-green-200 via-slate-300 to-lime-400 text-[#155215] shadow-lg rounded-md"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className="h-[70px] mt-6 mb-6"
                src="https://docs.base.org/img/logo_dark.svg"
              />
              <p>
                A secure Ethereum Layer-2 solution for scalable transactions.
              </p>
            </motion.div>

            {/* OnchainKit Card */}
            <motion.div
              className="p-6 bg-gradient-to-r from-green-200 via-emerald-300 to-lime-400 text-[#155215] shadow-lg rounded-md"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://onchainkit.xyz/favicon/48x48.png?v4-19-24"
                alt="OnchainKit Icon"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl text-white font-semibold mb-2">OnchainKit</h3>
              <p>
                Essential tools for integrating blockchain services seamlessly.
              </p>
            </motion.div>

            {/* BaseNames Card */}
            <motion.div
              className="p-6 bg-gradient-to-r from-green-200 via-emerald-300 to-lime-400 text-[#155215] shadow-lg rounded-md"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://www.base.org/_next/static/media/usernameBaseLogo.c13052c9.svg"
                alt="BaseNames Icon"
                className="w-16 h-18 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">BaseNames</h3>
              <p>A decentralized naming service to manage identities easily.</p>
            </motion.div>

            {/* Smart Wallet Card */}
            <motion.div
              className="p-6 bg-gradient-to-r from-green-200 via-emerald-300 to-lime-400 text-[#155215] shadow-lg rounded-md"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://pbs.twimg.com/profile_images/1499783051974303748/sm3dkwbI_400x400.png"
                alt="Smart Wallet Icon"
                className="w-16 h-18 mx-auto rounded-full mb-6"
              />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Wallet</h3>
              <p>Instant onboarding, zero cost, unified accounts, and secure, ERC-4337 compliant transactions.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-500 to-green-400">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Help the Farmer Community?
          </h2>
          <motion.button
            className="mt-8 bg-white text-green-500 px-8 py-4 rounded-lg font-medium text-lg shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            
			<ConnectWalletBtn
            handleSuccess={walletSuccessHandler}
            handleError={walletErrorHandler}
          />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
