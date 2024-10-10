import Banner from "../components/Banner";
import LeftCards from "../components/LeftCards";
import RightCards from "../components/RightCards";

export const Home = () => {
  return (
    <div className="px-4 pt-[66px]">
      <Banner />
      <div className="flex max-md:flex-col md:gap-4">
        <LeftCards />
        <RightCards />
      </div>
    </div>
  );
};
