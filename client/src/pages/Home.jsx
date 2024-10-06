import Banner from "../components/Banner";
import LeftCards from "../components/LeftCards";
import RightCards from "../components/RightCards";

export const Home = () => {
  return (
    <div className="p-4 pt-[75px]">
      <Banner />
      <div className="flex flex-col md:flex-row md:gap-4">
        <LeftCards />
        <RightCards />
      </div>
    </div>
  );
};
