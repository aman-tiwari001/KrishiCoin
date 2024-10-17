import Banner from "../components/Banner";
import LeftCards from "../components/LeftCards";
import RightCards from "../components/RightCards";

export const Home = () => {
  return (
    <div className="h-max pt-[60px] over px-2 flex flex-col ">
      <Banner />
      <div className="flex max-md:flex-col md:gap-4">
        <LeftCards />
        <RightCards />
      </div>
    </div>
  );
};
